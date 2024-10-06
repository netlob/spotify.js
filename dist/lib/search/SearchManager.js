"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchManager = void 0;
const Manager_1 = require("../Manager");
class SearchManager extends Manager_1.Manager {
    /**
     * @description Search the Spotify catalog for anything that matches the searchQuery.
     * @param {string} searchQuery The query you want to search for.
     * @param {SearchOptions} options The search options.
     * @returns {Promise<SearchItems>} Returns a promise with all the {@link SearchItems}.
     */
    async get(searchQuery, options) {
        const types = Object.keys(options.include).filter((key) => options.include[key]);
        const query = {
            q: searchQuery,
            limit: options?.limit?.toString() || '20',
            offset: options?.offset?.toString() || '0',
            type: types.join(',')
        };
        if (options?.market)
            query.market = options.market;
        if (options?.includeExternal)
            query.include_external = options.includeExternal;
        const res = await this.http.get('/v1/search', {
            query
        });
        return res.data;
    }
}
exports.SearchManager = SearchManager;
//# sourceMappingURL=SearchManager.js.map