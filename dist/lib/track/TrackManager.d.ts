import { Track } from '../../interfaces/Spotify';
import { Manager } from '../Manager';
export declare class TrackManager extends Manager {
    /**
     * @description Get a track by ID.
     * @param {string} id The ID of the track.
     * @returns {Promise<Track>} Returns a promise with a single {@link Track}.
     */
    get(id: string): Promise<Track>;
    /**
     * @description Get multiple tracks by ID.
     * @param {string[]} ids Array of IDs.
     * @returns {Promise<Track[]>} Returns a promise with {@link Track}s.
     */
    list(ids: string[]): Promise<Track[]>;
}
