<PanelsContainer>
    <Panel />
</PanelsContainer>

<script lang="ts">
    import PanelsContainer from "$lib/PanelsContainer.svelte";
    import Panel from "$lib/Panel.svelte";
	import { onDestroy, onMount } from "svelte";
	import { browser } from "$app/environment";
	import type Status from "$lib/types/status";
	import { token, notes, server_url } from "$lib/store";
    import { page } from "$app/stores";

    if (browser) {
        let ws: WebSocket;
        onMount(() => {
            token.set($page.data.user.token);
            server_url.set(new URL($page.data.user.server_url));

            $page.data.statuses.forEach((status: Status) => {
                $notes.set(status.id, status);
            });

            let params = new URLSearchParams({
                access_token: $token,
            });
            let ws_url = new URL($server_url);
            ws_url.protocol = "wss:";
            ws_url.pathname = "/api/v1/streaming";
            ws_url.search = params.toString();

            ws = new WebSocket(ws_url.toString());
            ws.onopen = (event) => {
                ws.send(JSON.stringify({"type": "subscribe", "stream": "user"}))
            };
            ws.onerror = (event) => {
                console.error(event);
            }
            ws.onmessage = (event) => {
                let e = JSON.parse(event.data)
                switch (e.event) {
                    case "update":
                        notes.update((n) => {
                            let note = JSON.parse(e.payload) as Status;
                            n.set(note.id, note);
                            return n;
                        })
                        break;
                }
            };
        
        })

        onDestroy(()=>{
            ws.close();
        })
    }
</script>
