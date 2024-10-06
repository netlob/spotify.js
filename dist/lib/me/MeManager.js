"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeManager = void 0;
const chunk_1 = require("../../util/chunk");
const Manager_1 = require("../Manager");
class MeManager extends Manager_1.Manager {
    /**
     * @description Get the current user's top tracks or artists.
     * @param  {string} type
     * @param  {TopOptions} options
     */
    async top(type, options) {
        const res = await this.http.get(`/v1/me/top/${type}`, {
            query: {
                time_range: options?.timeRange,
                limit: options?.limit,
                offset: options?.offset
            }
        });
        return res.data;
    }
    /**
     * @description Get current user's (private) data. (required scropes: user-read-private, user-read-email).
     * @returns {Promise<UserPrivate>}
     */
    async get() {
        const res = await this.http.get('/v1/me');
        return res.data;
    }
    /**
     * @description Get current user's recently played tracks. (required scoped: user-read-recently-played).
     * @param {limit?:number after?:number;before?:number} options?
     * @returns {Promise<CursorPagingObject<RecentlyPlayed>>} Returns a promise with the {@link RecentlyPlayed} items.
     */
    async recentlyPlayed(options) {
        const query = {
            limit: options?.limit ? options.limit : '20'
        };
        if (options?.after)
            query.after = options.after;
        if (options?.before)
            query.before = options.before;
        const res = await this.http.get(`/v1/me/player/recently-played`, {
            query
        });
        const json = res.data;
        json.items = json.items.map((item) => ({
            ...item,
            played_at: new Date(item.played_at)
        }));
        return json;
    }
    /**
     * @description Get information about the user’s current playback state, including track or episode, progress, and active device.
     * @returns {Promise} Returns a promise with the current playback state.
     */
    async getPlaybackState() {
        const res = await this.http.get(`/v1/me/player`);
        const json = res.data;
        return json;
    }
    /**
     * @description Check if one or more tracks is saved in the current user's library. (required scropes: user-library-read).
     * @returns {Promise<boolean[]>} Returns a promise with the an array of booleans.
     */
    async savedTracks(options) {
        const query = {};
        if (options?.market)
            query.market = options.market.toString();
        if (options?.limit)
            query.limit = options.limit.toString();
        if (options?.offset)
            query.offset = options.offset.toString();
        const res = await this.http.get(`/v1/me/tracks`, {
            query
        });
        return res.data;
    }
    /**
     * @description Check if one or more tracks is saved in the current user's library. (required scropes: user-library-read).
     * @returns {Promise<boolean[]>} Returns a promise with the an array of booleans.
     */
    async containTracks(ids) {
        const res = await this.http.get(`/v1/me/tracks/contains`, {
            query: { ids: ids.join(',') }
        });
        return res.data;
    }
    /**
     * @description Save multiple tracks by ID. (required scropes: user-library-read).
     * @param {string} ids Array of IDs.
     */
    async saveTracks(ids) {
        // Use an async loop to preserve the order of saves
        for (const chunkIds of (0, chunk_1.chunk)(ids, 50)) {
            await this.http.put(`/v1/me/tracks`, {
                ids: chunkIds
            });
        }
    }
    /**
     * @description Remove multiple saved tracks by ID. (required scropes: user-library-read).
     * @param {string} ids Array of IDs.
     */
    async unsaveTracks(ids) {
        // Use an async loop to preserve the order of unsaves
        for (const chunkIds of (0, chunk_1.chunk)(ids, 50)) {
            await this.http.delete(`/v1/me/tracks`, {
                ids: chunkIds
            });
        }
    }
    async playlists(options) {
        const query = {};
        if (options?.limit)
            query.limit = options.limit.toString();
        if (options?.offset)
            query.offset = options.offset.toString();
        const res = await this.http.get(`/v1/me/playlists`, {
            query
        });
        return res.data;
    }
    /**
     * @description Remove the current user as a follower of a playlist.
     * @param {string} id The Spotify ID of the playlist to unfollow.
     */
    async unfollowPlaylist(id) {
        await this.http.delete(`/v1/playlists/${id}/followers`, {});
    }
}
exports.MeManager = MeManager;
//# sourceMappingURL=MeManager.js.map