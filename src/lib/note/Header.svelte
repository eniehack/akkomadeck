<script lang="ts">
	import type Note from "../types/status";
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";

    export let note: Note;
    
    dayjs.extend(relativeTime);

    console.log(note);
</script>

<aside class="header">
    <img src="{note.account.avatar_static}" height="64" width="64" alt="{note.account.acct}のアバター"/>
    <div class="author-metadata">
        <a rel="author" href="{note.account.url}">
            {note.account.display_name}
        </a>
        <span>{note.account.acct}</span>
    </div>
    <div class="metadata">
        <time>{dayjs(note.created_at).fromNow(true)}</time>
        <span>{note.visibility}</span>
    </div>
</aside>

<style>  
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
</style>