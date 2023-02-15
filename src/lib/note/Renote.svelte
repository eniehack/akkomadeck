<div class="renote">
    <button on:click={renote(note_id)}>renote</button>
    <span class="count">{renote_count}</span>
</div>

<script lang="ts">
    import { token } from "../store";
    export let note_id: string
    export let renote_count: number

    const renote = async (id: string) => {
        let status = fetch(`/api/v1/statuses/${id}/renote`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${$token}`
            }
        })
        if ( ! status.ok ) {
            console.error(`failed renote(${id})`)
        }
    }
</script>