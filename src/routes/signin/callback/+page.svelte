<p>redirecting</p>

<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { browser } from "$app/environment";
    import { fetch_access_token, type OAuthClient, verify_credentials } from "$lib/oauth";
	import { onMount } from "svelte";
	import { ClientStorageItemParse, UserStorageItemSerializer } from "$lib/localstorage";

    if (browser) {
        onMount(async () => {
            const code = (new URL($page.url)).searchParams.get("code")
            if (code == null)  return;
            let client_str = localStorage.getItem("client")
            if (client_str === null) return;

            let client = ClientStorageItemParse(client_str)
            if (typeof client === "undefined") return;

            let server_url = new URL(client.server_url)
            let resp = await fetch_access_token(
                server_url,
                code,
                {id: client.client_id, secret: client.client_secret} as OAuthClient
            );
            let user = UserStorageItemSerializer({oauth_code: code, token: resp.access_token, server_url: client.server_url})
            localStorage.setItem("user", user)

            if (await verify_credentials(server_url, resp.access_token)) {
                goto(import.meta.env.BASE_URL);
            }
        });
        //localStorage.setItem("oauth2_code", code);
    }
</script>