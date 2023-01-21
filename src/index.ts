import {CronJob} from "cron";
import PlaylistUtils from "./spotify/utils/playlist-utils.js";
import {env} from "bun";
import {SpotifyWebApi} from "./spotify/spotify-web-api.js";
import DateUtil from "./common/utils/date-util.js";

const winston = require('winston');

export const log = winston.createLogger({
    format: winston.format.cli(),
    'transports': [
        new winston.transports.Console()
    ]
})

async function main() {
    if (!env.CLIENT_ID || !env.CLIENT_SECRET || !env.REFRESH_TOKEN) {
        throw new Error("CLIENT_ID, CLIENT_SECRET or REFRESH_TOKEN env var undefined!")
    }
    if (!env.DISCOVER_WEEKLY_ID) {
        throw new Error("DISCOVER_WEEKLY_ID env var undefined!")
    }
    if(!env.CRON) {
        throw new Error("CRON env var undefined!")
    }

    const spotifyApi = new SpotifyWebApi(env.CLIENT_ID!, env.CLIENT_SECRET!, env.REFRESH_TOKEN!)
    const successfulRefresh = await spotifyApi.refreshAccessToken()
    const currentUser = (await spotifyApi.getMe()).body

    if (!successfulRefresh) {
        throw new Error("Can not refresh token.")
    }

    log.info(`Logged in as: ${currentUser.display_name}`)


    const job = new CronJob(env.CRON,
        async () => {
            log.info("Start archiving...")

            const successfulRefresh = await spotifyApi.refreshAccessToken()
            if(!successfulRefresh) {
                log.error("Can not refresh access token. Failed to archive discover weekly.")
                return
            }

            const date = new Date()
            const successful = await PlaylistUtils.copyToNew(
                spotifyApi,
                currentUser.id,
                env.DISCOVER_WEEKLY_ID!,
                `discover-weekly-${date.getFullYear()}-KW${DateUtil.getWeekOfYear(date)}`
            )

            if(successful) {
                log.info("Successfully archived discover weekly.")
            } else {
                log.error("Failed to archive discover weekly.")
            }
        })

    job.start()
}

main().catch(reason => log.error(`Start up failed: ${reason}`))