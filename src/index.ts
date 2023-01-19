import {CronJob} from "cron";
import PlaylistUtils from "./spotify/utils/playlist-utils.js";
import {env} from "bun";
import {SpotifyWebApi} from "./spotify/spotify-web-api.js";

const winston = require('winston');

const log = winston.createLogger({
    format: winston.format.cli(),
    'transports': [
        new winston.transports.Console()
    ]
})

async function main() {
    if(env.CLIENT_ID === undefined || env.CLIENT_SECRET === undefined) {
        throw new Error("CLIENT_ID or CLIENT_SECRET env var undefined!")
    }

    const spotifyApi = new SpotifyWebApi(env.CLIENT_ID!, env.CLIENT_SECRET!)
    spotifyApi.getMe().then(value => {
        log.info(`Logged in as user: ${value.display_name}`)
    })
    const job = new CronJob('* * * * * *',
        () => {
            PlaylistUtils.copyToNew(spotifyApi)
        })

    job.start()
}

main().catch(reason => () => log.crit(`Start up failed: ${reason}`))