import { SearchItems, SearchOptions } from '../../interfaces/Spotify';
import { Manager } from '../Manager';
export declare class SearchManager extends Manager {
    /**
     * @description Search the Spotify catalog for anything that matches the searchQuery.
     * @param {string} searchQuery The query you want to search for.
     * @param {SearchOptions} options The search options.
     * @returns {Promise<SearchItems>} Returns a promise with all the {@link SearchItems}.
     */
    get(searchQuery: string, options: SearchOptions): Promise<SearchItems>;
}
