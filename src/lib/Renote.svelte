<script lang="ts">
	import type { ReblogStatus } from './types/status';
	import NoteComponent from './Note.svelte';
	import { intersection } from './post';

	export let note: ReblogStatus;
	let expanded: boolean;
	let jsonElem: HTMLSpanElement;
	console.log(note.content);

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
			<aside class="header">
				<a href={note.account.url}>
					<img
						src={note.account.avatar_static}
						height="16"
						width="16"
						alt="{note.account.acct}のアバター"
					/>
					{note.account.display_name}
				</a>
				からのrenote
			</aside>
			<NoteComponent note={note.reblog} />
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
