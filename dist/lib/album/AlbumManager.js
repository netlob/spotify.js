"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumManager = void 0;
const chunk_1 = require("../../util/chunk");
const Manager_1 = require("../Manager");
class AlbumManager extends Manager_1.Manager {
    /**
     * @description Get a album by ID.
     * @param {string} id The ID of the album.
     * @returns {Promise<Album>} Returns a promise with a single {@link Album}.
     */
    async get(id) {
        const res = await this.http.get(`/v1/albums/${id}`);
        return res.data;
    }
    /**
     * @description Get multiple albums by ID.
     * @param {string[]} ids Array of IDs.
     * @returns {Promise<Album[]>} Returns a promise with an array of {@link Album}s.
     */
    async list(ids) {
        const albums = await Promise.all((0, chunk_1.chunk)([...ids], 20).map(async (chunk) => {
            const res = await this.http.get('/v1/albums', { query: { ids: chunk.join(',') } });
            const json = res.data;
            return json.albums;
        }));
        return albums.flat();
    }
    async tracks(id, options) {
        const query = {
            limit: options?.limit ? options.limit.toString() : '20',
            offset: options?.offset ? options.offset.toString() : '0'
        };
        if (options.market)
            query.market = options.market;
        const res = await this.http.get(`/v1/albums/${id}/tracks`, { query });
        return res.data;
    }
    async newReleases(options) {
        const query = {
            limit: options?.limit?.toString() || '20',
            offset: options?.offset?.toString() || '0'
        };
        const res = await this.http.get('/v1/browse/new-releases', { query });
        return res.data;
    }
}
exports.AlbumManager = AlbumManager;
//# sourceMappingURL=AlbumManager.js.map