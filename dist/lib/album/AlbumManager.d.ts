import { Album, Markets, PagingObject, PagingOptions, Track, NewReleases } from '../../interfaces/Spotify';
import { Manager } from '../Manager';
export declare class AlbumManager extends Manager {
    /**
     * @description Get a album by ID.
     * @param {string} id The ID of the album.
     * @returns {Promise<Album>} Returns a promise with a single {@link Album}.
     */
    get(id: string): Promise<Album>;
    /**
     * @description Get multiple albums by ID.
     * @param {string[]} ids Array of IDs.
     * @returns {Promise<Album[]>} Returns a promise with an array of {@link Album}s.
     */
    list(ids: string[]): Promise<Album[]>;
    tracks(id: string, options?: PagingOptions & {
        market?: Markets;
    }): Promise<PagingObject<Track>>;
    newReleases(options?: PagingOptions & {
        country?: Markets;
    }): Promise<NewReleases>;
}
