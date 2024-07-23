<script lang="ts">
	import type { Status as Note } from './types/status';
	import Header from './note/Header.svelte';
	import ReactionBar from './note/ReactionBar.svelte';
	import { intersection } from './post';

	export let note: Note;
	let expanded = false;
	let jsonElem: HTMLSpanElement;

	function handleIntersection() {
		if (!expanded) {
			note = JSON.parse(jsonElem.textContent!);
			expanded = true;
		} else {
			JSON.stringify(note);
			expanded = false;
		}
	}
</script>

<div use:intersection={{ onIntersect: handleIntersection }}>
	{#if expanded}
		<article>
			<Header {note} />
			<div class="post-body">
				{@html note.content}
			</div>
			<ReactionBar {note} />
		</article>
	{:else}
		<span bind:this={jsonElem}></span>
	{/if}
</div>

<style>
	article {
		margin: 10px 0;
		border: 1.5px solid;
	}
</style>
