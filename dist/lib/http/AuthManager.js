"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthManager = void 0;
/* eslint-disable no-console */
const axios_1 = __importDefault(require("axios"));
const errors_1 = require("../errors");
const accountsApiUrl = 'https://accounts.spotify.com/api';
const accessTokenExpireTTL = 60 * 60 * 1000; // 1hour
class AuthManager {
    constructor(
    // eslint-disable-next-line no-unused-vars
    config, 
    // eslint-disable-next-line no-unused-vars
    privateConfig) {
        this.config = config;
        this.privateConfig = privateConfig;
        this.client = axios_1.default.create({
            baseURL: accountsApiUrl,
            auth: {
                username: this.config.clientCredentials?.clientId,
                password: this.config.clientCredentials?.clientSecret
            },
            validateStatus: () => true
        });
    }
    /**
     * @description Get a refresh token.
     * @param {number} retryAttempt Number of of retries.
     * @returns {string} Returns the refresh token.
     */
    async refreshToken(retryAttempt) {
        if (!this.config.clientCredentials.clientId ||
            !this.config.clientCredentials.clientSecret ||
            !this.config.refreshToken) {
            throw new errors_1.AuthError('Missing information needed to refresh token, required: client id, client secret, refresh token');
        }
        const response = await this.client.post('/token', new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: this.config.refreshToken
        }));
        const { status: statusCode } = response;
        if (statusCode === 200) {
            return response.data.access_token;
        }
        if (statusCode === 400) {
            throw new errors_1.AuthError('Failed to refresh token: bad request', {
                data: response.data
            });
        }
        if (retryAttempt >= 5) {
            if (statusCode >= 500 && statusCode < 600) {
                throw new errors_1.AuthError(`Failed to refresh token: server error (${statusCode})`);
            }
            throw new errors_1.AuthError(`Request retry attempts exceeded, failed with status code ${statusCode}`);
        }
        if (this.config.debug) {
            console.log(`Failed to refresh token: got (${statusCode}) response. Retrying... (${retryAttempt + 1})`);
        }
        return await this.refreshToken(retryAttempt + 1);
    }
    /**
     * Get authorization token with client credentials flow.
     * @param {number} retryAttempt Number of of retries.
     * @returns {string} Returns the authorization token.
     */
    async requestToken(retryAttempt) {
        const response = await this.client.post('/token', new URLSearchParams({
            grant_type: 'client_credentials'
        }));
        const { status: statusCode } = response;
        if (statusCode === 200) {
            return response.data.access_token;
        }
        if (statusCode === 400) {
            throw new errors_1.AuthError(`Failed to get token: bad request`, {
                data: response.data
            });
        }
        if (retryAttempt >= 5) {
            if (statusCode >= 500 && statusCode < 600) {
                throw new errors_1.AuthError(`Failed to get token: server error (${statusCode})`);
            }
            throw new errors_1.AuthError(`Request retry attempts exceeded, failed with status code ${statusCode}`);
        }
        if (typeof this.config.debug === 'boolean' && this.config.debug === true) {
            console.log(`Failed to get token: got (${statusCode}) response. retrying... (${retryAttempt + 1})`);
        }
        return await this.requestToken(retryAttempt + 1);
    }
    /**
     * @description Handles the auth tokens.
     * @returns {string} Returns a auth token.
     */
    async getToken() {
        if (this.config.accessToken) {
            // non-expirable token
            if (typeof this.privateConfig.tokenExpireAt === 'undefined') {
                return this.config.accessToken;
            }
            // check if token is expired
            if (Date.now() < this.privateConfig.tokenExpireAt) {
                // return already defined access token
                return this.config.accessToken;
            }
        }
        // refresh token
        if (this.config.clientCredentials?.clientId &&
            this.config.clientCredentials?.clientSecret &&
            this.config.refreshToken) {
            const accessToken = await this.refreshToken(1);
            this.config.accessToken = accessToken;
            this.privateConfig.tokenExpireAt = Date.now() + accessTokenExpireTTL;
            return accessToken;
        }
        // add credentials flow
        if (this.config.clientCredentials?.clientId && this.config.clientCredentials?.clientSecret) {
            const accessToken = await this.requestToken(1);
            this.config.accessToken = accessToken;
            this.privateConfig.tokenExpireAt = Date.now() + accessTokenExpireTTL;
            return accessToken;
        }
        throw new errors_1.AuthError('auth failed: missing information to handle auth');
    }
}
exports.AuthManager = AuthManager;
//# sourceMappingURL=AuthManager.js.map