"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistManager = void 0;
const chunk_1 = require("../../util/chunk");
const Manager_1 = require("../Manager");
class ArtistManager extends Manager_1.Manager {
    /**
     * @description Get a artist by ID.
     * @param {string} id
     * @returns {Promise<Artist[]>} Returns a promise with a single {@link Artist}.
     */
    async get(id) {
        const res = await this.http.get(`/v1/artists/${id}`);
        return res.data;
    }
    /**
     * @description Get multiple artists by ID.
     * @param {string[]} ids Array of IDs.
     * @returns {Promise<Artist[]>} Returns a promise with an array of {@link Artist}s.
     */
    async list(ids) {
        const artists = await Promise.all((0, chunk_1.chunk)([...ids], 50).map(async (chunk) => {
            const res = await this.http.get('/v1/artists', { query: { ids: chunk.join(',') } });
            const json = res.data;
            return json.artists;
        }));
        return artists.flat();
    }
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
    async albums(id, options) {
        let include_groups = [];
        if (options?.include) {
            include_groups = Object.keys(options.include).filter((key) => options.include[key]);
        }
        else {
            include_groups = ['album', 'single', 'appears_on', 'compilation'];
        }
        const query = {
            include_groups: include_groups.join(','),
            limit: options?.limit?.toString() || '20',
            offset: options?.offset?.toString() || '0'
        };
        if (options?.market)
            query.market = options.market;
        const res = await this.http.get(`/v1/artists/${id}/albums`, {
            query
        });
        return res.data;
    }
    /**
     * @description Get related artists by ID.
     * @param {string} id
     * @returns {Promise<CursorPagingObject<Album[]>>} Returns a promise with an array of {@link Artist}s.
     */
    async related(id) {
        const res = await this.http.get(`/v1/artists/${id}/related-artists`);
        return res.data.artists;
    }
    /**
     * @description Get top tracks from artist by ID.
     * @param {string} id
     * @param {Markets} market An ISO 3166-1 alpha-2 country code.
     * If a country code is specified, only episodes that are available in that market will be returned.
     * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.
     * Note: If neither market or user country are provided, the content is considered unavailable for the client.
     * @returns {Promise<Track[]>} Returns a promise with an array of {@link Track}s.
     */
    async topTracks(id, market) {
        const query = {};
        if (market)
            query.market = market;
        const res = await this.http.get(`/v1/artists/${id}/top-tracks`, {
            query
        });
        return res.data.tracks;
    }
}
exports.ArtistManager = ArtistManager;
//# sourceMappingURL=ArtistManager.js.map