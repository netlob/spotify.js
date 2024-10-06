"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackManager = void 0;
const Manager_1 = require("../Manager");
const chunk_1 = require("../../util/chunk");
class TrackManager extends Manager_1.Manager {
    /**
     * @description Get a track by ID.
     * @param {string} id The ID of the track.
     * @returns {Promise<Track>} Returns a promise with a single {@link Track}.
     */
    async get(id) {
        const res = await this.http.get(`/v1/tracks/${id}`);
        return res.data;
    }
    /**
     * @description Get multiple tracks by ID.
     * @param {string[]} ids Array of IDs.
     * @returns {Promise<Track[]>} Returns a promise with {@link Track}s.
     */
    async list(ids) {
        const tracks = await Promise.all((0, chunk_1.chunk)([...ids], 50).map(async (chunk) => {
            const res = await this.http.get('/v1/tracks', { query: { ids: chunk.join(',') } });
            const json = res.data;
            return json.tracks;
        }));
        return tracks.flat();
    }
}
exports.TrackManager = TrackManager;
//# sourceMappingURL=TrackManager.js.map