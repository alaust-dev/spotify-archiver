import {GetCurrentUserProfileResponse} from "./interfaces/get-current-user-profile-response.js";

export class SpotifyWebApi {

    private clientId: string
    private clientSecret: string


    constructor(clientId: string, clientSecret: string) {
        this.clientId = clientId
        this.clientSecret = clientSecret
    }

    getMe(): Promise<GetCurrentUserProfileResponse> {
        return new Promise<GetCurrentUserProfileResponse>(() => {})
    }

    createPlaylist(title: string) {

    }
}