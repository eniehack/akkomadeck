<article>
    <aside class="header">
        <img src="{note.account.avatar_static}" height="64" width="64" alt="{note.account.acct}のアバター"/>
        <div class="author-metadata">
            <a rel="author" href="{note.account.url}">
                {note.account.display_name}
            </a>
            <span>{note.account.acct}</span>
        </div>
        <div class="metadata">
            <time>{note.created_at}</time>
            <span>{note.visibility}</span>
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
</script>
