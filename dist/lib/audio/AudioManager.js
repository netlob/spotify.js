"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioManager = void 0;
const Manager_1 = require("../Manager");
class AudioManager extends Manager_1.Manager {
    /**
     * @description Get audio features for a track.
     * @param  {string} id The ID of the track.
     * @returns {Promise<AudioFeatures>} Returns a promise with a {@link AudioFeatures}.
     */
    async feature(id) {
        const res = await this.http.get(`/v1/audio-features/${id}`);
        return res.data;
    }
    /**
     * @description Get audio features for muliples tracks.
     * @param  {string[]} trackIds The IDs of the tracks.
     * @returns {Promise<AudioFeatures[]>} Returns a promise with a {@link AudioFeatures}.
     */
    async features(trackIds) {
        const res = await this.http.get('/v1/audio-features', {
            query: {
                ids: trackIds.join(',')
            }
        });
        return res.data.audio_features;
    }
    /**
     * @description Get a detailed audio analysis for a single track identified by its unique Spotify ID.
     * @param  {string} id The ID of the track.
     * @returns {Promise<AudioAnalysis>} Returns a promise with a {@link AudioAnalysis}.
     */
    async analysis(id) {
        const res = await this.http.get(`/v1/audio-analysis/${id}`);
        return res.data;
    }
}
exports.AudioManager = AudioManager;
//# sourceMappingURL=AudioManager.js.map