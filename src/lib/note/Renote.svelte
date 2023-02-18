<div class="renote">
    <span on:click={() => renote(note_id)}>
        <Icon alt="renote" icon={RepeatIcon}/>
    </span>
    <span class="count">{renote_count}</span>
</div>

<script lang="ts">
    import RepeatIcon from "$lib/repeat.svg";
    import { server_url, token } from "$lib/store";
	import type Account from "$lib/types/account";
    import Icon from "./Icon.svelte";
    export let note_id: string
    export let renote_count: number

    const renote = async (note_id: string) => {
        let status = await fetch(`${$server_url.toString()}api/v1/statuses/${note_id}/reblog`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${$token}`
            }
        })
        if ( ! status.ok ) {
            console.error(`failed renote(${note_id})`)
            return;
        }
        let reblogged_by_status = await fetch(`${$server_url.toString()}api/v1/statuses/${note_id}/reblogged_by`, {
            headers: {
                "Authorization": `Bearer ${$token}`
            }
        });
        if ( ! reblogged_by_status.ok ) {
            console.error(`failed renote(${note_id})`)
            return;
        }

        return await reblogged_by_status.json() as Account;
    }
</script>