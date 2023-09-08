<script lang="ts">
	import type Status from "$lib/types/status";
    import Quote from "./Quote.svelte";
    import Renote from "./Renote.svelte";
    import Favorites from "./Favorites.svelte";

    export let note: Status;
</script>

<aside class="reaction">
    <Quote note_id={note.id} />
    <Renote note_id={note.id} renote_count={note.reblogs_count}/>
    <Favorites note_id={note.id} fav_count={note.favourites_count}/>
    <span class="reaction">
        reaction
    </span>
    <span class="fav">
        fav
    </span>
</aside>

<style>
.reaction {
    display: flex;
    flex-direction: row;
}
</style>