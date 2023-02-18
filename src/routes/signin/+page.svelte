<div>
    <label for="instance">インスタンス名を入力:</label>
    <input bind:value={instance_name} type="text" name="instance" id="instance_textbox">
    <button on:click={submit}>submit</button>
</div>

<script lang="ts">
	import { browser } from "$app/environment";
	import { ClientStorageItemSerializer } from "$lib/localstorage";
    import { create_client, authorize_url } from "$lib/oauth";
    let instance_name: string;
    let submit: () => Promise<void>;

    if (browser) {
        submit = async () => {
            let server_url = new URL(`https://${instance_name}/`);
            let client_url_str: string;
            if (import.meta.env.PROD) {
                if (import.meta.env.VITE_VERCEL === "1") {
                    client_url_str = import.meta.env.VITE_VERCEL_URL
                } else {
                    client_url_str = import.meta.env.VITE_CLIENT_HOST
                }
            } else {
                client_url_str = "localhost:5173";
            }
            console.log(client_url_str);
            console.log(import.meta.env.VITE_CLIENT_HOST);
            let client_url = new URL(`https://${client_url_str}`)
            if (client_url.hostname === "localhost") {
                client_url.protocol = "http:";
            }
            console.log(client_url)
            let resp = await create_client(server_url, client_url);
            if (resp === null) {
                console.error("create_client: something went wrong");
                return
            }

            localStorage.setItem(
                "client",
                ClientStorageItemSerializer({
                    client_id: resp.client_id,
                    client_secret: resp.client_secret,
                    server_url: server_url,
                    client_host: client_url,
                })
            );

            location.href = authorize_url(server_url, resp.client_id, client_url).toString()
        }
    }
</script>
