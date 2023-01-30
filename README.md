# Spotify Archiver
[![Build Status](https://jenkins.alexander-aust.de/buildStatus/icon?job=spotify-archiver%2Fdevelop)](https://jenkins.alexander-aust.de/job/spotify-archiver/job/develop/)

A tooling to archive my Spotify Discover Weekly's.


## TL;DR - I want this thing to run

1. First you need to create a new Spotify app [here](https://developer.spotify.com/dashboard/applications).
2. Copy your Client ID and Client Secret.
3. Get your refresh token. You can find a tutorial [here](https://benwiz.com/blog/create-spotify-refresh-token/).
4. You can copy Discover Weekly PlaylistID within the Spotify Web Player.
5. Lastly you can set, when the tool should run and copies your Discover Weekly.

You can run it with Docker:
```shell
docker run -p 30100:30100 \
 -e CLIENT_ID=<YOUR CLIENT_ID> \
 -e CLIENT_SECRET=<YOUR CLIENT_SECRET> \
 -e REFRESH_TOKEN=<YOUR REFRESH_TOKEN> \
 -e DISCOVER_WEEKLY_ID=<YOUR DISCOVER_WEEKLY_PLAYLIST_ID> \
 -e CRON=<THE CRON SCHEDULE> \
 alaust/spotify-archiver:latest
```
### Available Tag's:
- **latest** - Recommended: the latest stable version (main branch)
- **stage** - the latest development build (develop branch)

### Cron Format:
```
--------- Seconds: 0-59
| --------- Minutes: 0-59
| | --------- Hours: 0-23
| | | --------- Day of Month: 1-31
| | | | --------- Months: 0-11 (Jan-Dec)
| | | | | --------- Day of Week: 0-6 (Sun-Sat)
| | | | | |
0 0 3 * * 2
```
This example shows a scheduled time at **03:00:00 on Tuesday**.

## Health Endpoint
You can monitor if the last run is not older than 8 days.

It returns the date of the last run and status code 200 if it's not
older than 8 days, otherwise it returns 500.

## Kubernetes Deployment
I deploy this Software on Kubernetes, you can find the deployment files
[here](https://github.com/alaust-dev/kubernetes-deployments).