<script lang="ts">
    import BaseModal from "../BaseModal.svelte";
    import { server_url, token } from "../store";

    export let note_id: string;
    let postText: HTMLTextAreaElement;
    let showModal = false;

    const createQuote = async (text: string): Promise<boolean> => {
        let status = await fetch(`${$server_url.toString()}api/v1/statuses`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${$token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: text,
                quote_id: note_id
            })
        })
        if ( ! status.ok ) {
            console.error(`failed createPost`)
        }
        return status.ok;
    }
</script>

<button on:click={() => showModal = true}>post</button>
<BaseModal bind:showModal>
    <h1>post</h1>
    <textarea bind:this={postText}></textarea>
    <button on:click={() =>
        createQuote(postText.value)
            .then(res => {if (res) { showModal = false }})
    }>
        Quote
    </button>
</BaseModal>