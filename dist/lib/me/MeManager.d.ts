import { PlayerState } from '../../interfaces/Spotify/Player';
import { RecentlyPlayed, UserPrivate, Artist, Track, CursorPagingObject, PagingObject, TopOptions, Playlist, Markets, LibraryTrack } from '../../interfaces/Spotify';
import { Manager } from '../Manager';
export declare class MeManager extends Manager {
    /**
     * @description Get current user's top artists.
     * @param {string} type
     * @param {TopOptions} options?
     * @returns {Promise<PagingObject<Artist>>} Returns a promise with the paginated {@link Artist}.
     */
    top(type: 'artists', options?: TopOptions): Promise<PagingObject<Artist>>;
    /**
     * @description Get current user's top tracks.
     * @param {string} type
     * @param {TopOptions} options?
     * @returns {Promise<PagingObject<Track>>} Returns a promise with the paginated {@link Track}.
     */
    top(type: 'tracks', options?: TopOptions): Promise<PagingObject<Track>>;
    /**
     * @description Get current user's (private) data. (required scropes: user-read-private, user-read-email).
     * @returns {Promise<UserPrivate>}
     */
    get(): Promise<UserPrivate>;
    /**
     * @description Get current user's recently played tracks. (required scoped: user-read-recently-played).
     * @param {limit?:number after?:number;before?:number} options?
     * @returns {Promise<CursorPagingObject<RecentlyPlayed>>} Returns a promise with the {@link RecentlyPlayed} items.
     */
    recentlyPlayed(options?: {
        limit?: number;
        after?: number;
        before?: number;
    }): Promise<CursorPagingObject<RecentlyPlayed>>;
    /**
     * @description Get information about the user’s current playback state, including track or episode, progress, and active device.
     * @returns {Promise} Returns a promise with the current playback state.
     */
    getPlaybackState(): Promise<PlayerState>;
    /**
     * @description Check if one or more tracks is saved in the current user's library. (required scropes: user-library-read).
     * @returns {Promise<boolean[]>} Returns a promise with the an array of booleans.
     */
    savedTracks(options?: {
        market?: Markets;
        limit?: number;
        offset?: number;
    }): Promise<CursorPagingObject<LibraryTrack>>;
    /**
     * @description Check if one or more tracks is saved in the current user's library. (required scropes: user-library-read).
     * @returns {Promise<boolean[]>} Returns a promise with the an array of booleans.
     */
    containTracks(ids: string[]): Promise<boolean[]>;
    /**
     * @description Save multiple tracks by ID. (required scropes: user-library-read).
     * @param {string} ids Array of IDs.
     */
    saveTracks(ids: string[]): Promise<void>;
    /**
     * @description Remove multiple saved tracks by ID. (required scropes: user-library-read).
     * @param {string} ids Array of IDs.
     */
    unsaveTracks(ids: string[]): Promise<void>;
    playlists(options?: {
        limit?: number;
        offset?: number;
    }): Promise<CursorPagingObject<Playlist>>;
    /**
     * @description Remove the current user as a follower of a playlist.
     * @param {string} id The Spotify ID of the playlist to unfollow.
     */
    unfollowPlaylist(id: string): Promise<void>;
}
