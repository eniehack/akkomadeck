import type CustomEmoji from "./custom_emoji"

interface Option {
    title: string
    votes_count: null | number
}

export default interface Poll {
    id: string
    expired_at: null | string
    expired: boolean
    multiple: boolean
    votes_count: number
    voters_count: null | number
    options: Option[]
    emojis: CustomEmoji[]
    voted?: boolean
    own_votes?: boolean
}