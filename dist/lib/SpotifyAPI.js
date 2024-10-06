"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyAPI = void 0;
const AlbumManager_1 = require("./album/AlbumManager");
const ArtistManager_1 = require("./artist/ArtistManager");
const AudioManager_1 = require("./audio/AudioManager");
const HttpClient_1 = require("./http/HttpClient");
const MeManager_1 = require("./me/MeManager");
const PlaylistManager_1 = require("./playlist/PlaylistManager");
const RecommendationsManager_1 = require("./recommendations/RecommendationsManager");
const SearchManager_1 = require("./search/SearchManager");
const TrackManager_1 = require("./track/TrackManager");
const UserManager_1 = require("./user/UserManager");
class SpotifyAPI {
    constructor(config) {
        this.config = config;
        this.privateConfig = {};
        // TODO: remove for v2
        // eslint-disable-next-line deprecation/deprecation
        if (!this.config.accessToken && config.acccessToken) {
            // eslint-disable-next-line deprecation/deprecation
            this.config.accessToken = config.acccessToken;
        }
        const client = new HttpClient_1.HttpClient(this.config, this.privateConfig);
        this.tracks = new TrackManager_1.TrackManager(client);
        this.albums = new AlbumManager_1.AlbumManager(client);
        this.artists = new ArtistManager_1.ArtistManager(client);
        this.users = new UserManager_1.UserManager(client);
        this.me = new MeManager_1.MeManager(client);
        this.search = new SearchManager_1.SearchManager(client);
        this.recommendations = new RecommendationsManager_1.RecommendationsManager(client);
        this.audio = new AudioManager_1.AudioManager(client);
        this.playlist = new PlaylistManager_1.PlaylistManager(client);
    }
}
exports.SpotifyAPI = SpotifyAPI;
//# sourceMappingURL=SpotifyAPI.js.map