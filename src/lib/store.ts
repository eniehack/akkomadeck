import { writable, type Writable } from "svelte/store";
import type Status from "./types/status";

export const token: Writable<string> = writable("");
export const notes: Writable<Map<string, Status>> = writable(new Map<string, Status>());
export const server_url: Writable<URL> = writable();