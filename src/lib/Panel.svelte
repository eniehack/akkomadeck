<div class="panel-wrapper">
    <div class="panel">
        <PanelHeader />
        <div class="panel-content">
            {#each $notes_order as k}
                {#if typeof $notes.get(k) !== "undefined"}
                    {#if ($notes.get(k))?.reblog === null }
                        <Note note={$notes.get(k)} />
                    {:else}
                        <Renote note={$notes.get(k)} />
                    {/if}
                {/if}
            {/each}
        </div>
    </div>
</div>

<style>
 .panel-wrapper {
     flex: 0 0 auto;
     height: 100%;
 }
.panel {
     margin: 0;
     /* width: 100%; */
     width: 350px;
     /*height: calc(100% - 2px);*/
     max-height: 100vh;
     overflow-x: hidden;
     overflow-y: hidden;
     border: 2px solid #444448;
     display: flex;
     flex-direction: column;
 }
 .panel-content {
    overflow-x: hidden;
    overflow-y: scroll;
    flex:1 1 calc(100vh - 55px);
}
</style>

<script lang="ts">
    import PanelHeader from "$lib/PanelHeader.svelte";
    import Note from "./Note.svelte";
    import Renote from "./Renote.svelte";
    import { notes, notes_order } from "./store";
</script>
