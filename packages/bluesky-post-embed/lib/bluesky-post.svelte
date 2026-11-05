<script lang="ts">
	import EmbedFrame from 'internal/components/embed-frame.svelte';
	import HighlightedPost from 'internal/components/highlighted-post.svelte';
	import Post from 'internal/components/post.svelte';
	import type { PostData } from 'internal/types/post.js';

	const { data }: { data: PostData } = $props();
</script>

{#if data.type === 'thread'}
	{@const { anchor, parent } = data}

	<EmbedFrame>
		{#if parent}
			<Post post={parent.post} parent={parent.parent} />
		{/if}

		<HighlightedPost post={anchor.post} parent={anchor.parent} prev={parent !== null} />
	</EmbedFrame>
{:else if data.type === 'no-unauthenticated'}
	{@render Message(`The author has requested for their posts to not be displayed on external sites.`)}
{:else}
	{@render Message(`The post can't be found, it may have been deleted.`)}
{/if}

{#snippet Message(msg: string)}
	<EmbedFrame>
		<div class="bluesky-embed__message">{msg}</div>
	</EmbedFrame>
{/snippet}
