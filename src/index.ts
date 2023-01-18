import {CronJob} from "cron";
import SpotifyWebApi from "spotify-web-api-node";
import PlaylistUtils from "./spotify/utils/playlist-utils.js";

const winston = require('winston');

const log = winston.createLogger({
    format: winston.format.cli(),
    'transports': [
        new winston.transports.Console()
    ]
})

async function main() {
    const spotifyApi = new SpotifyWebApi()

    const job = new CronJob('* * * * * *',
        () => {
            PlaylistUtils.copyToNew(spotifyApi)
        })

    job.start()
}

main().catch(reason => () => log.crit(`Start up failed: ${reason}`))