import {CronJob} from "cron";

const winston = require('winston');

const log = winston.createLogger({
    format: winston.format.cli(),
    'transports': [
        new winston.transports.Console()
    ]
})

async function main() {
    const job = new CronJob('* * * * * *',
        () => {

        })

    job.start()
}

main().catch(reason => () => log.crit(`Start up failed: ${reason}`))