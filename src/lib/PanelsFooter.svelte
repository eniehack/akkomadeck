<button on:click={() => showModal = true}>+</button>
<BaseModal bind:showModal>
    <ul>
        <li>Home</li>
        <li>List</li>
        <li>Local</li>
    </ul>
</BaseModal>

<script lang="ts">
    let showModal = false;
    import BaseModal from "./BaseModal.svelte";
</script>