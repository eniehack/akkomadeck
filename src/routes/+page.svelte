<PanelsContainer>
    <Panel>
        {#each $notes as note}
            <Note note={note} />
        {/each}
    </Panel>
</PanelsContainer>

<script lang="ts">
    import PanelsContainer from "$lib/PanelsContainer.svelte";
    import Panel from "$lib/Panel.svelte";
    import Note from "$lib/Note.svelte";
	import { UserStorageItemParse } from "$lib/localstorage";
	import { onDestroy, onMount } from "svelte";
	import { browser } from "$app/environment";
	import type Status from "$lib/types/status";
	import { token, notes } from "$lib/store";

    if (browser) {
        let ws: WebSocket;
        onMount(() => {
            let user_str = localStorage.getItem("user");
            if (user_str === null) return;

            let user = UserStorageItemParse(user_str);
            if (typeof user === "undefined") return;

            token.set(user.token)

            let params = new URLSearchParams({
                access_token: user.token,
            });
            let ws_url = new URL(user.server_url);
            ws_url.protocol = "wss:";
            ws_url.pathname = "/api/v1/streaming";
            ws_url.search = params.toString();
            console.log(ws_url.toString());

            ws = new WebSocket(ws_url.toString());
            ws.onopen = (event) => {
                console.debug("ws start")
                console.log(event)
                ws.send(JSON.stringify({"type": "subscribe", "stream": "user"}))
            };
            ws.onerror = (event) => {
                console.error(event);
            }
            ws.onmessage = (event) => {
                let e = JSON.parse(event.data)
                console.log(e);
                switch (e.event) {
                    case "update":
                        notes.update((n) => {
                            let note = JSON.parse(e.payload) as Status;

                            return [note, ...n]
                        })
                        break;
                }
            };
        });
        onDestroy(()=>{
            ws.close();
        })
    }
</script>
