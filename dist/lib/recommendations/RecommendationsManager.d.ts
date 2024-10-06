import { RecommendationsFilterOptions, RecommendationsResult } from '../../interfaces/Spotify';
import { Manager } from '../Manager';
export declare class RecommendationsManager extends Manager {
    /**
     * @description Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details. For artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.
     * @param {SearchOptions} options The recommendation filters.
     * @returns {Promise<RecommendationsResult>} Returns a promise with all recommended tracks and seed options {@link RecommendationsResult}.
     */
    get(options: RecommendationsFilterOptions): Promise<RecommendationsResult>;
}
