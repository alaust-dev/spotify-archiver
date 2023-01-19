export interface GetCurrentUserProfileResponse {
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

export interface ExplicitContent {
    filter_enabled: boolean
    filter_locked: boolean
}

export interface ExternalUrls {
    spotify: string
}

export interface Followers {
    href: string
    total: number
}

export interface Images {
    url: string
    height: number
    width: number
}