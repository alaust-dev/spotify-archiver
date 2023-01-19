import {GetCurrentUserProfileResponse} from "./interfaces/get-current-user-profile-response.js";
import {Response} from "./interfaces/response.js";

export class SpotifyWebApi {

    private clientId: string
    private clientSecret: string


    constructor(clientId: string, clientSecret: string) {
        this.clientId = clientId
        this.clientSecret = clientSecret
    }

    getMe(): Promise<Response<GetCurrentUserProfileResponse>> {
        return new Promise<Response<GetCurrentUserProfileResponse>>(() => {})
    }

    createPlaylist(title: string) {

    }
}