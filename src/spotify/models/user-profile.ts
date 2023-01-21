import {ExternalUrls} from "./external-urls.js";
import {Followers} from "./followers.js";
import {ExplicitContent} from "./explicit-content.js";
import {Images} from "./images.js";

export interface UserProfile {
    country: string
    display_name: string
    email: string
    explicit_content: ExplicitContent
    external_urls: ExternalUrls
    followers: Followers
    href: string
    id: string
    images: Images
    product: string
    type: string
    uri: string
}