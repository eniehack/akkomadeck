<div class="favorites">
    <span on:click={() => favorite(note_id)}>
        <Icon alt="renote" icon={StarIcon}/>
    </span>
    <span class="count">{fav_count}</span>
</div>

<script lang="ts">
    import StarIcon from "$lib/star.svg";
    import Icon from "./Icon.svelte";
	import { token, server_url } from "$lib/store";
	import type Account from "$lib/types/account";

    export let note_id: string
    export let fav_count: number

    const favorite = async (note_id: string) => {
        let status = await fetch(`${$server_url.toString()}api/v1/statuses/${note_id}/favourite`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${$token}`
            }
        })
        if ( ! status.ok ) {
            console.error(`failed favorites(${note_id})`)
        }

        let favourited_by_status = await fetch(`${$server_url.toString()}api/v1/statuses/${note_id}/favourited_by`, {
            headers: {
                "Authorization": `Bearer ${$token}`
            }
        });
        if ( ! favourited_by_status.ok ) {
            console.error(`failed renote(${note_id})`)
            return;
        }

        return await favourited_by_status.json() as Account;
    }
</script>