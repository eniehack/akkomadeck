import { browser } from "$app/environment";
import type { PageLoad } from "./$types";
import { UserStorageItemParse } from "$lib/localstorage";
import { redirect } from "@sveltejs/kit";
import type Status from "$lib/types/status";

export const load = (async ({fetch}) => {
    if (browser) {
        let user_str = localStorage.getItem("user");
        if (user_str === null) {
            throw redirect(303, "/signin")
        }

        let user = UserStorageItemParse(user_str);
        if (typeof user === "undefined") {
            throw redirect(303, "/signin")
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