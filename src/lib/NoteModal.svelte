<script lang="ts">
    import BaseModal from "./BaseModal.svelte";
    import { server_url, token } from "./store";

    let postText: HTMLTextAreaElement;
    let showModal = false;

    const createPost = async (text: string): boolean => {
        let status = await fetch(`${$server_url.toString()}api/v1/statuses`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${$token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: text
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
    <button on:click={() => {
        if (createPost(postText.value)) {
            showModal = false
        }
    }}>post</button>
</BaseModal>