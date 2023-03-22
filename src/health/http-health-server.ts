import * as http from "http";
import {log} from "../index.js";

export interface HealthStatus {
    lastRun: string
}

export class HttpHealthServer {

    public static healthStatus: HealthStatus = {
        lastRun: new Date().toString()
    }

    start() {
        http.createServer((req, res) => {
            const lastRun = new Date(HttpHealthServer.healthStatus.lastRun)
            const lastWeek = new Date()
            lastWeek.setDate(lastWeek.getDate() -8)

            if(lastRun < lastWeek ) {
                res.writeHead(500)
            }

            res.write(JSON.stringify(HttpHealthServer.healthStatus))
            res.end()
        }).listen(30100)
        log.info("Http health server started up!")
    }
}