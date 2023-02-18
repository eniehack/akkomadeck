import type Account from "./account";
import type MediaAttachment from "./media_attachment";
import type Tag from "./tag";
import type CustomEmoji from "./custom_emoji";
import type Poll from "./poll";

interface Application {
    name: string,
    website: string | null,
}

export interface Mention {
    id: string
    username: string
    url: string
    acct: string
}

export default interface Status {
    id: string,
    uri: string,
    created_at: string,
    account: Account,
    content: string,
    visibility: "public" | "unlisted" | "private" | "direct",
    sensitive: boolean
    media_attachments: MediaAttachment[],
    application?: Application,
    spoiler_text: string,
    mentions: Mention[],
    tags: Tag[],
    emojis: CustomEmoji[],
    reblogs_count: number,
    favourites_count: number,
    replies_count: number,
    url: string,
    in_reply_to_id: null | string,
    in_reply_to_account_id: null | string,
    reblog: null | Status,
    poll: Poll,
    card: Object | null,
    language: string | null,
    text: string | null,
    edited_at: string | null,
    favourited?: boolean,
    reblogged?: boolean,
    muted?: boolean,
    bookmarked?: boolean,
    pinned?: boolean, 
    filtered?: Object,
}