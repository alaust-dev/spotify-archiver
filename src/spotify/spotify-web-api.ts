import {Response} from "./models/response.js";
import {UserProfile} from "./models/user-profile.js";
import {Playlist} from "./models/playlist.js";

export class SpotifyWebApi {

    private readonly clientId: string
    private readonly clientSecret: string
    private readonly refreshToken: string
    private accessToken: string = ""


    constructor(clientId: string, clientSecret: string, refreshToken: string) {
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.refreshToken = refreshToken
    }

    async refreshAccessToken(): Promise<boolean> {
        const data: URLSearchParams = new URLSearchParams()
        data.append("grant_type", "refresh_token")
        data.append("refresh_token", this.refreshToken)
        //@ts-ignore - necessary to add data to body
        const response = await fetch("https://accounts.spotify.com/api/token",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'Authorization': `Basic ${(new Buffer(this.clientId + ':' + this.clientSecret).toString('base64'))}`
                },
                body: data
            })
        if (response.status !== 200) {
            return false
        }

        const body: any = await response.json()
        this.accessToken = body.access_token
        return true
    }

    async getMe(): Promise<Response<UserProfile>> {
        const response = await fetch("https://api.spotify.com/v1/me",
            {
                headers: {
                    "Authorization": `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                }
            })
        const body: UserProfile = await response.json()
        return {status: response.status, body: body}
    }

    async getPlaylist(id: string): Promise<Response<Playlist>> {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                "Authorization": `Bearer ${this.accessToken}`,
                "Content-Type": "application/json"
            }
        })
        const body: Playlist = await response.json()
        return {status: response.status, body: body}
    }

    async addTracksToPlaylist(playlistId: string, trackUris: string[]): Promise<boolean> {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.accessToken}`,
                "Content-Type": "application/json"
            },
            body: `${JSON.stringify({uris: trackUris, position: 0})}`
        })
        return response.status === 201
    }

    async createPlaylist(userId: string, title: string): Promise<Response<Playlist>> {
        const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.accessToken}`,
                "Content-Type": "application/json"
            },
            body: `${JSON.stringify({name: title, public: false})}`
        })
        const body: Playlist = await response.json()
        return {status: response.status, body: body}
    }
}