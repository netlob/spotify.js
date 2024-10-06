import { AlbumSimplified, Artist, Markets, PagingObject, PagingOptions, Track } from '../../interfaces/Spotify';
import { Manager } from '../Manager';
export declare class ArtistManager extends Manager {
    /**
     * @description Get a artist by ID.
     * @param {string} id
     * @returns {Promise<Artist[]>} Returns a promise with a single {@link Artist}.
     */
    get(id: string): Promise<Artist>;
    /**
     * @description Get multiple artists by ID.
     * @param {string[]} ids Array of IDs.
     * @returns {Promise<Artist[]>} Returns a promise with an array of {@link Artist}s.
     */
    list(ids: string[]): Promise<Artist[]>;
    /**
     * @description Get multiple albums from an artist by ID.
     * @param {string} id
     * @param {object} options
     * @param {Markets} options.market An ISO 3166-1 alpha-2 country code.
     * If a country code is specified, only episodes that are available in that market will be returned.
     * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.
     * Note: If neither market or user country are provided, the content is considered unavailable for the client.
     * @returns {Promise<PagingObject<AlbumSimplified[]>>} Returns a promise with an array of {@link Album}s.
     */
    albums(id: string, options?: PagingOptions & {
        include?: {
            album?: boolean;
            single?: boolean;
            appears_on?: boolean;
            compilation?: boolean;
        };
        market?: Markets;
    }): Promise<PagingObject<AlbumSimplified>>;
    /**
     * @description Get related artists by ID.
     * @param {string} id
     * @returns {Promise<CursorPagingObject<Album[]>>} Returns a promise with an array of {@link Artist}s.
     */
    related(id: string): Promise<Artist[]>;
    /**
     * @description Get top tracks from artist by ID.
     * @param {string} id
     * @param {Markets} market An ISO 3166-1 alpha-2 country code.
     * If a country code is specified, only episodes that are available in that market will be returned.
     * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.
     * Note: If neither market or user country are provided, the content is considered unavailable for the client.
     * @returns {Promise<Track[]>} Returns a promise with an array of {@link Track}s.
     */
    topTracks(id: string, market?: Markets): Promise<Track[]>;
}
