<div>
    <label for="instance">インスタンス名を入力:</label>
    <input bind:value={instance_name} type="text" name="instance" id="instance_textbox">
    <button on:click={submit}>submit</button>
</div>

<script lang="ts">
	import { ClientStorageItemSerializer } from "$lib/localstorage";
    import { create_client, authorize_url } from "$lib/oauth";
    let instance_name: string;


    const submit = async () => {
        let server_url = new URL(`https://${instance_name}/`);
        console.log(server_url.toString());
        let client_url_str = import.meta.env.PROD ? import.meta.env.CLIENT_URL : "http://localhost:5173";
        console.log(client_url_str);
        let client_url = new URL(client_url_str)
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
</script>
