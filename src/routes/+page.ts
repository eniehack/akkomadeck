import { browser } from "$app/environment";
import type { PageLoad } from "./$types";
import { UserStorageItemParse } from "$lib/localstorage";
import { error } from "@sveltejs/kit";
import type Status from "$lib/types/status";

export const load = (async ({fetch}) => {
    if (browser) {
        let user_str = localStorage.getItem("user");
        if (user_str === null) {
            throw error(500, "cannot load user data.");
        }

        let user = UserStorageItemParse(user_str);
        if (typeof user === "undefined") {
            throw error(500, "cannot load user data.");
        }

        let resp = await fetch(`${user.server_url}api/v1/timelines/home`, {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });

        let statuses = await resp.json() as Status[];

        return {
            user,
            statuses,
        }
    }
}) satisfies PageLoad;

export const ssr = false;
export const csr = true;