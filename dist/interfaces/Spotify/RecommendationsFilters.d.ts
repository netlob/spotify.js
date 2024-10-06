import { Markets } from './shared';
export interface RecommendationsFilterOptions {
    seed_tracks?: string[];
    seed_artists?: string[];
    seed_genres?: string[];
    /**
     * Maximum number of results to return.
     * Minimum: 1. Maximum: 100. Default: 20.
     * **Note**: The limit is applied within each type, not on the total response.
     */
    limit?: number;
    /**
     * An ISO 3166-1 alpha-2 country code or the string `from_token`.
     * If market is set to `from_token`, and a valid access token is specified in the request header, only content playable in the country associated with the user account, is returned.
     */
    market?: Markets;
    min_acousticness?: number;
    max_acousticness?: number;
    target_acousticness?: number;
    max_danceability?: number;
    min_danceability?: number;
    target_danceability?: number;
    min_energy?: number;
    max_energy?: number;
    target_energy?: number;
    min_instrumentalness?: number;
    max_instrumentalness?: number;
    target_instrumentalness?: number;
    min_key?: number;
    max_key?: number;
    target_key?: number;
    min_liveness?: number;
    max_liveness?: number;
    target_liveness?: number;
    min_loudness?: number;
    max_loudness?: number;
    target_loudness?: number;
    min_mode?: number;
    max_mode?: number;
    target_mode?: number;
    min_popularity?: number;
    max_popularity?: number;
    target_popularity?: number;
    min_speechiness?: number;
    max_speechiness?: number;
    target_speechiness?: number;
    min_tempo?: number;
    max_tempo?: number;
    target_tempo?: number;
    min_valence?: number;
    max_valence?: number;
    target_valence?: number;
    min_time_signature?: number;
    max_time_signature?: number;
    target_time_signature?: number;
    min_duration_ms?: number;
    max_duration_ms?: number;
    target_duration_ms?: number;
}
