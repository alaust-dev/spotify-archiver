import {SpotifyWebApi} from "../spotify-web-api.js";
import {Playlist} from "../models/playlist.js";
import {Response} from "../models/response.js";

export default class PlaylistUtils {
    static async copyToNew(spotifyApi: SpotifyWebApi,
                           userId: string,
                           origin: string,
                           newPlaylistTitle: string): Promise<boolean> {
        let archivePlaylistResponse: Response<Playlist> =
            await spotifyApi.createPlaylist(userId, newPlaylistTitle)
        if (archivePlaylistResponse.status !== 201) return false

        const trackUris = []
        const discoverWeekly: Playlist = (await spotifyApi.getPlaylist(origin)).body

        for (const item of discoverWeekly.tracks.items) {
            trackUris.push(item.track.uri)
        }

        return await spotifyApi.addTracksToPlaylist(archivePlaylistResponse.body.id, trackUris)
    }
}