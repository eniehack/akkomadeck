<article>
    <aside class="header">
        <a href="{note.account.url}">
            <img src="{note.account.avatar_static}" height="16" width="16" alt="{note.account.acct}のアバター"/>
            {note.account.display_name}
        </a>
        からのrenote
    </aside>
    {#if note.reblog !== null}
        <Header note={note.reblog} />
    {/if}
    <div class="post-body">
        {@html note.reblog?.content}
    </div>
    <ReactionBar note={note} />
</article>

<style>
 article {
     margin: 10px 0;
     border: 1.5px solid;
 }
</style>

<script lang="ts">
    import type Note from "./types/status";
    import ReactionBar from "./note/ReactionBar.svelte";
    import Header from "./note/Header.svelte";

    export let note: Note;
    console.log(note.content);
</script>
