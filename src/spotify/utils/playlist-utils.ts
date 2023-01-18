import {getWeekOfYear} from "../../common/utils/date-util.js";
import SpotifyWebApi from "spotify-web-api-node";

export default class PlaylistUtils {
    static copyToNew(spotifyApi: SpotifyWebApi) {
        const date = new Date()
        const response =
            spotifyApi.createPlaylist(`discover-weekly-${date.getFullYear()}-KW${getWeekOfYear(date)}`)
    }
}