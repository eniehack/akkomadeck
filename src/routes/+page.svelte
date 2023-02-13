<PanelsContainer>
    <Panel>
        <Post>
            <h1>Welcome to SvelteKit 2</h1>
            <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
        </Post>
        <Post>
            <h1>Welcome to SvelteKit 2</h1>
            <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
        </Post>
    </Panel>
    <Panel>
        <Post>
            <h1>Welcome to SvelteKit 2</h1>
            <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
        </Post>
        <Post>
            <h1>Welcome to SvelteKit 2</h1>
            <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
        </Post>
        <Post>
            <h1>Welcome to SvelteKit 2</h1>
            <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
        </Post>
        <Post>
            <h1>Welcome to SvelteKit 2</h1>
            <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
        </Post>
        <Post>
            <h1>Welcome to SvelteKit 2</h1>
            <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
        </Post>
        <Post>
            <h1>Welcome to SvelteKit 2</h1>
            <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
        </Post>
    </Panel>
    <Panel>
        <Post>
            <h1>Welcome to SvelteKit 2</h1>
            <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
        </Post>
    </Panel>
    <Panel>
        <Post>
            <h1>Welcome to SvelteKit 2</h1>
            <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
        </Post>
    </Panel>
</PanelsContainer>

<script lang="ts">
    import PanelsContainer from "$lib/PanelsContainer.svelte";
    import Panel from "$lib/Panel.svelte";
    import Post from "$lib/Post.svelte";
	import { UserStorageItemParse } from "$lib/localstorage";
	import { onDestroy, onMount } from "svelte";
	import { browser } from "$app/environment";

    if (browser) {
        let ws: WebSocket;
        onMount(() => {
            let user_str = localStorage.getItem("user");
            if (user_str === null) return;

            let user = UserStorageItemParse(user_str);
            if (typeof user === "undefined") return;

            let params = new URLSearchParams();
            params.append("access_token", user.token);
            params.append("stream", "user");

            let ws_url = new URL(user.server_url);
            ws_url.protocol = "wss:";
            ws_url.pathname = "/api/v1/streaming";
            ws_url.search = params.toString();
            console.log(ws_url.toString());

            ws = new WebSocket(ws_url.toString());
            ws.onopen = (event) => {
                console.debug("ws start")
                console.log(event)
                //ws.send(JSON.stringify({"type": "subscribe", "stream": "user"}))
            };
            ws.onerror = (event) => {
                console.error(event);
            }
            ws.onmessage = (event) => {
                console.log("received: "+event.data)
            };
        });
        onDestroy(()=>{
            ws.close();
        })
    }
</script>
