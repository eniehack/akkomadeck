export default interface MediaAttachment {
    id: string;
    type: "unknown" | "image" | "gifv" | "video" | "audio";
    url: string;
    preview_url: string;
    rmeote_url: null | string;
    meta: Object;
    description: string;
    blurhash: string;
}