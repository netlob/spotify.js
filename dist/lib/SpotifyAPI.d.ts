import { SpotifyConfig } from '../interfaces/Config';
import { AlbumManager } from './album/AlbumManager';
import { ArtistManager } from './artist/ArtistManager';
import { AudioManager } from './audio/AudioManager';
import { MeManager } from './me/MeManager';
import { PlaylistManager } from './playlist/PlaylistManager';
import { RecommendationsManager } from './recommendations/RecommendationsManager';
import { SearchManager } from './search/SearchManager';
import { TrackManager } from './track/TrackManager';
import { UserManager } from './user/UserManager';
export declare class SpotifyAPI {
    config: SpotifyConfig;
    tracks: TrackManager;
    albums: AlbumManager;
    artists: ArtistManager;
    users: UserManager;
    me: MeManager;
    search: SearchManager;
    recommendations: RecommendationsManager;
    audio: AudioManager;
    playlist: PlaylistManager;
    private privateConfig;
    constructor(config: SpotifyConfig);
}
