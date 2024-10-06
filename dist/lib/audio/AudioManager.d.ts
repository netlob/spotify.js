import { AudioAnalysis } from '../../interfaces/Spotify/AudioAnalysis';
import { AudioFeatures } from '../../interfaces/Spotify/AudioFeatures';
import { Manager } from '../Manager';
export declare class AudioManager extends Manager {
    /**
     * @description Get audio features for a track.
     * @param  {string} id The ID of the track.
     * @returns {Promise<AudioFeatures>} Returns a promise with a {@link AudioFeatures}.
     */
    feature(id: string): Promise<AudioFeatures>;
    /**
     * @description Get audio features for muliples tracks.
     * @param  {string[]} trackIds The IDs of the tracks.
     * @returns {Promise<AudioFeatures[]>} Returns a promise with a {@link AudioFeatures}.
     */
    features(trackIds: string[]): Promise<AudioFeatures[]>;
    /**
     * @description Get a detailed audio analysis for a single track identified by its unique Spotify ID.
     * @param  {string} id The ID of the track.
     * @returns {Promise<AudioAnalysis>} Returns a promise with a {@link AudioAnalysis}.
     */
    analysis(id: string): Promise<AudioAnalysis>;
}
