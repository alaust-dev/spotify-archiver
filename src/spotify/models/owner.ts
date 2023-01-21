import {ExternalUrls} from "./external-urls.js";
import {Followers} from "./followers.js";

export interface Owner {
    external_urls: ExternalUrls
    followers: Followers
    href: string
    id: string
    type: string
    uri: string
}