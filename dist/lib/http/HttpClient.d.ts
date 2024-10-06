import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { PrivateConfig, SpotifyConfig } from '../../interfaces/Config';
import { AuthManager } from './AuthManager';
export declare class HttpClient {
    protected config: SpotifyConfig;
    protected baseURL: string;
    protected auth: AuthManager;
    protected client: AxiosInstance;
    constructor(config: SpotifyConfig, privateConfig: PrivateConfig);
    /**
     * @param {string} slug
     * @param {Record<string, string>} query
     * @returns {string} Returns the full url.
     */
    getURL(slug: string, query?: Record<string, string>): string;
    /**
     * Create an axios instance, set interceptors, handle errors & auth.
     */
    private createClient;
    private handleError;
    private shouldRetryRequest;
    private extractResponseError;
    private get maxRetryAttempts();
    /**
     * @param {string} slug The slug to get.
     * @param {{query?: Record<string, string> & AxiosRequestConfig}} config Config.
     * @returns {AxiosPromise} Returns a promise with the response.
     */
    get(slug: string, config?: {
        query?: Record<string, string>;
    } & AxiosRequestConfig): AxiosPromise;
    /**
     * @param {string} slug The slug to post.
     * @param {any} data Body data.
     * @param {{Record<string, string> & RequestInit}} config Config.
     * @returns {AxiosPromise} Returns a promise with the response.
     */
    post(slug: string, data: unknown, config?: {
        query?: Record<string, string>;
    } & AxiosRequestConfig): AxiosPromise;
    /**
     * @param {string} slug The slug to put.
     * @param {any} data Body data.
     * @param {{Record<string, string> & RequestInit}} config Config.
     * @returns {AxiosPromise} Returns a promise with the response.
     */
    put(slug: string, data: unknown, config?: {
        query?: Record<string, string>;
    } & AxiosRequestConfig): AxiosPromise;
    /**
     * @param {string} slug The slug to delete.
     * @param {unknown} data Body data.
     * @param {{Record<string, string> & RequestInit}} config Config.
     * @returns {AxiosPromise} Returns a promise with the response.
     */
    delete(slug: string, data: unknown, config?: {
        query?: Record<string, string>;
    } & AxiosRequestConfig): AxiosPromise;
}
