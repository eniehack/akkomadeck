<div class="favorites">
    <button on:click={favorites(note_id)}>favorite</button>
    <span class="count">{fav_count}</span>
</div>

<script lang="ts">
    import { token } from "../store";
    export let note_id: string
    export let fav_count: number

    const favorites = async (id: string) => {
        let status = fetch(`/api/v1/statuses/${id}/favorites`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${$token}`
            }
        })
        if ( ! status.ok ) {
            console.error(`failed favorites(${id})`)
        }
    }
</script>