"use strict";
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const axios_1 = __importDefault(require("axios"));
const url_1 = require("url");
const https = __importStar(require("https"));
const axios_better_stacktrace_1 = __importDefault(require("axios-better-stacktrace"));
const errors_1 = require("../errors");
const sleep_1 = require("../../util/sleep");
const AuthManager_1 = require("./AuthManager");
class HttpClient {
    constructor(config, privateConfig) {
        this.config = config;
        this.baseURL = 'https://api.spotify.com';
        this.client = this.createClient();
        if (config.http?.baseURL) {
            this.baseURL = config.http.baseURL;
        }
        this.auth = new AuthManager_1.AuthManager(config, privateConfig);
    }
    /**
     * @param {string} slug
     * @param {Record<string, string>} query
     * @returns {string} Returns the full url.
     */
    getURL(slug, query) {
        const url = new url_1.URL(this.baseURL);
        url.pathname = slug;
        url.search = new url_1.URLSearchParams(query).toString();
        return url.toString();
    }
    /**
     * Create an axios instance, set interceptors, handle errors & auth.
     */
    createClient() {
        const config = {
            proxy: this.config.http?.proxy,
            headers: {
                ...this.config.http?.headers,
                'User-Agent': this.config.http?.userAgent ?? `@statsfm/spotify.js https://github.com/statsfm/spotify.js`
            },
            validateStatus: (status) => status >= 200 && status < 300
        };
        if (this.config.http?.localAddress) {
            config.transport = {
                ...https,
                request: (options, callback) => https.request({
                    ...options,
                    localAddress: this.config.http?.localAddress,
                    family: this.config.http?.localAddress.includes(':') ? 6 : 4
                }, callback)
            };
        }
        const client = axios_1.default.create(config);
        (0, axios_better_stacktrace_1.default)(client);
        // request interceptor
        client.interceptors.request.use(async (config) => {
            const accessToken = await this.auth.getToken();
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
        });
        // error handling interceptor
        client.interceptors.response.use((response) => response, (err) => this.handleError(client, err));
        return client;
    }
    async handleError(client, err) {
        if (axios_1.default.isCancel(err) || axios_1.default.isAxiosError(err) === false || !this.shouldRetryRequest(err)) {
            return await Promise.reject(this.extractResponseError(err));
        }
        const requestConfig = err.config;
        requestConfig.retryAttempt || (requestConfig.retryAttempt = 0);
        const isRateLimited = err.response && err.response.status === 429;
        if (isRateLimited) {
            if (this.config.logRetry) {
                console.log(err.response);
            }
            const retryAfter = Number(err.response.headers['retry-after']) || 0;
            if (this.config.logRetry || this.config.logRetry === undefined) {
                console.error(`Hit ratelimit, retrying in ${retryAfter} second(s), client id: ${this.config.clientCredentials?.clientId ?? 'none'}, path: ${err.request.path}`);
            }
            await (0, sleep_1.sleep)(retryAfter * 1000);
            requestConfig.retryAttempt = 0;
        }
        else {
            await (0, sleep_1.sleep)(1000);
            requestConfig.retryAttempt += 1;
            if (this.config.debug) {
                console.log(`(${requestConfig.retryAttempt}/${this.maxRetryAttempts}) retry ${requestConfig.url} - ${err}`);
            }
        }
        return await client.request(requestConfig);
    }
    shouldRetryRequest(err) {
        // non-response errors should clarified as 5xx and retried (socket hangup, ECONNRESET, etc.)
        if (!err.response) {
            if (this.config.retry5xx === false) {
                return false;
            }
            const { retryAttempt = 0 } = err.config;
            return retryAttempt < this.maxRetryAttempts;
        }
        const { status } = err.response;
        if (status === 429) {
            return this.config.retry !== false;
        }
        if (status >= 500 && status < 600) {
            if (this.config.retry5xx === false) {
                return false;
            }
            const { retryAttempt = 0 } = err.config;
            return retryAttempt < this.maxRetryAttempts;
        }
        return false;
    }
    extractResponseError(err) {
        if (axios_1.default.isCancel(err) || axios_1.default.isAxiosError(err) === false) {
            return err;
        }
        // non-response errors should clarified as 5xx and retried (socket hangup, ECONNRESET, etc.)
        if (!err.response) {
            const { retryAttempt = 0 } = err.config;
            if (this.config.retry5xx === false || retryAttempt < this.maxRetryAttempts) {
                return err;
            }
            return new errors_1.RequestRetriesExceededError(`Request max${this.maxRetryAttempts} retry attempts exceeded`, err.config.url, err.stack);
        }
        const { stack, config, response } = err;
        const { status, headers, data } = response;
        if (status >= 500 && status < 600) {
            const { retryAttempt } = err.config;
            if (this.config.retry5xx === false || retryAttempt < this.maxRetryAttempts) {
                return err;
            }
            return new errors_1.RequestRetriesExceededError(`Request ${this.maxRetryAttempts} retry attempts exceeded`, err.config.url, err.stack);
        }
        switch (status) {
            case 400:
                return new errors_1.BadRequestError(config.url, {
                    stack,
                    data
                });
            case 401:
                return new errors_1.UnauthorizedError(config.url, {
                    stack,
                    data
                });
            case 403:
                return new errors_1.ForbiddenError(config.url, {
                    stack,
                    data
                });
            case 404:
                throw new errors_1.NotFoundError(config.url, stack);
            case 429:
                return new errors_1.RatelimitError(`Hit ratelimit, retry after ${headers['retry-after']} seconds`, err.config.url, {
                    stack,
                    data
                });
        }
        return err;
    }
    get maxRetryAttempts() {
        return this.config.retry5xxAmount ?? 3;
    }
    /**
     * @param {string} slug The slug to get.
     * @param {{query?: Record<string, string> & AxiosRequestConfig}} config Config.
     * @returns {AxiosPromise} Returns a promise with the response.
     */
    async get(slug, config) {
        return await this.client.get(this.getURL(slug, config?.query), config);
    }
    /**
     * @param {string} slug The slug to post.
     * @param {any} data Body data.
     * @param {{Record<string, string> & RequestInit}} config Config.
     * @returns {AxiosPromise} Returns a promise with the response.
     */
    async post(slug, data, config) {
        return await this.client.post(this.getURL(slug, config?.query), data, config);
    }
    /**
     * @param {string} slug The slug to put.
     * @param {any} data Body data.
     * @param {{Record<string, string> & RequestInit}} config Config.
     * @returns {AxiosPromise} Returns a promise with the response.
     */
    async put(slug, data, config) {
        return await this.client.put(this.getURL(slug, config?.query), data, config);
    }
    /**
     * @param {string} slug The slug to delete.
     * @param {unknown} data Body data.
     * @param {{Record<string, string> & RequestInit}} config Config.
     * @returns {AxiosPromise} Returns a promise with the response.
     */
    async delete(slug, data, config) {
        return await this.client.delete(this.getURL(slug, config?.query), {
            ...config,
            data
        });
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=HttpClient.js.map