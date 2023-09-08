<article>
    <Header note={note} />
    <div class="post-body">
        {@html note.content}
    </div>
    <ReactionBar note={note}/>
</article>

<style>
 article {
     margin: 10px 0;
     border: 1.5px solid;
 }
</style>

<script lang="ts">
    import type Note from "./types/status";
    import Header from "./note/Header.svelte";
    import ReactionBar from "./note/ReactionBar.svelte";

    export let note: Note;
</script>
