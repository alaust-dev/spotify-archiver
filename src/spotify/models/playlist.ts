import {ExternalUrls, Followers, Images} from "../interfaces/get-current-user-profile-response.js";
import {Owner, Tracks} from "../interfaces/get-playlist-response.js";

export interface Playlist {
    collaborative: boolean
    description: string | null
    external_urls: ExternalUrls
    followers: Followers
    href: string
    id: string
    images: Images
    name: string
    owner: Owner
    public: boolean
    snapshot_id: string
    tracks: Tracks
    type: string
    uri: string
}