import { writable, type Writable } from "svelte/store";

export const posts: Writable<Post[]> = writable();