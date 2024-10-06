import { AxiosInstance } from 'axios';
import { PrivateConfig, SpotifyConfig } from '../../interfaces/Config';
export declare class AuthManager {
    protected config: SpotifyConfig;
    protected privateConfig: PrivateConfig;
    protected client: AxiosInstance;
    constructor(config: SpotifyConfig, privateConfig: PrivateConfig);
    /**
     * @description Get a refresh token.
     * @param {number} retryAttempt Number of of retries.
     * @returns {string} Returns the refresh token.
     */
    private refreshToken;
    /**
     * Get authorization token with client credentials flow.
     * @param {number} retryAttempt Number of of retries.
     * @returns {string} Returns the authorization token.
     */
    private requestToken;
    /**
     * @description Handles the auth tokens.
     * @returns {string} Returns a auth token.
     */
    getToken(): Promise<string>;
}
