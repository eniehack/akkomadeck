import type CustomEmoji from "./custom_emoji"

interface Field {
    name: string
    value: string
    verified_at: null | string
}

export default interface Account {
    id: string
    username: string
    acct: string
    url: string
    display_name: string
    note: string
    avatar: string
    avatar_static: string
    header: string
    header_static: string
    locked: boolean
    fields: Field[]
    emojis: CustomEmoji[],
    bot: boolean
    group: boolean
    discoverable: null | boolean,
    noindex?: null | boolean
    moved?: null | Account
    suspended?: boolean,
    limited?: boolean,
    created_at: string,
    last_status_at: null | string
    statuses_count: number
    followers_count: number
    following_count: number
}