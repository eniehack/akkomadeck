<article>
    <aside class="header">
        <a href="{note.account.url}">
            <img src="{note.account.avatar_static}" height="16" width="16" alt="{note.account.acct}のアバター"/>
            {note.account.display_name}
        </a>
        からのrenote
    </aside>
    <aside class="header">
        <img src="{note.reblog?.account.avatar_static}" height="64" width="64" alt="{note.reblog?.account.acct}のアバター"/>
        <div class="author-metadata">
            <a rel="author" href="{note.reblog?.account.url}">
                {note.reblog?.account.display_name}
            </a>
            <span>{note.reblog?.account.acct}</span>
        </div>
        <div class="metadata">
            <time>{note.reblog?.created_at}</time>
            <span>{note.reblog?.visibility}</span>
        </div>
    </aside>
    <div class="post-body">
        {@html note.content}
    </div>
    <aside class="reaction">
        <span class="quote">
            quote
        </span>
        <Renote note_id={note.id} renote_count={note.reblogs_count}/>
        <Favorites note_id={note.id} fav_count={note.favourites_count}/>
        <span class="reaction">
            reaction
        </span>
        <span class="fav">
            fav
        </span>
    </aside>
</article>

<style>
 article {
     margin: 10px 0;
     border: 1.5px solid;
 }

 .author-metadata {
    display: flex;
    flex-direction: column;
 }
 .metadata {
    display: flex;
    flex-direction: column;
 }
 .header {
    display: flex;
    flex-direction: row;
 }

 .reaction {
    display: flex;
    flex-direction: row;
 }
</style>

<script lang="ts">
    import type Note from "./types/status";
    import Renote from "./note/Renote.svelte"
	import Favorites from "./note/Favorites.svelte";

    export let note: Note;
    console.log(note.reblog);
</script>
