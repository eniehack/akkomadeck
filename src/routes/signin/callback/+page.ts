import type { PageLoad } from "./$types";

import { browser } from "$app/environment";
import { fetch_access_token, type OAuthClient, verify_credentials } from "$lib/oauth";
import { ClientStorageItemParse } from "$lib/localstorage";

export const load = (async ({ fetch, url }) => {
    if (!browser) return;

    const code = url.searchParams.get("code")
    if (code === null)  return;

    let client_str = localStorage.getItem("client")
    if (client_str === null) return;

    let client = ClientStorageItemParse(client_str)
    if (typeof client === "undefined") return;

    let server_url = new URL(client.server_url)
    let resp = await fetch_access_token(
        fetch,
        server_url,
        code,
        {id: client.client_id, secret: client.client_secret} as OAuthClient
    );

    if ( ! await verify_credentials(fetch, server_url, resp.access_token) ) return;

    return {
        oauth_code: code,
        token: resp.access_token,
        server_url: client.server_url
    }
}) satisfies PageLoad;