import SpotifyWebApi from 'spotify-web-api-node'

class PlaylistCopier {
    private spotifyApi: SpotifyWebApi

    public constructor(spotifyApi: SpotifyWebApi) {
        this.spotifyApi = spotifyApi
    }

    public copy() {
        this.spotifyApi.createPlaylist('')
    }
}