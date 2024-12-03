<script lang="ts" module>
	import type { AppBskyFeedDefs, AppBskyFeedGetPostThread } from '@atcute/client/lexicons';

	type ThreadData = AppBskyFeedGetPostThread.Output['thread'];
	type PostView = AppBskyFeedDefs.PostView;

	const unwrapPostThread = (data: ThreadData, contextless: boolean, allowUnauthenticated: boolean) => {
		const items: { post: PostView; parent: PostView | null }[] = [];

		let i = 0;
		let il = contextless ? 1 : 2;

		let curr: typeof data | undefined = data;
		while (curr) {
			if (
				curr.$type === 'app.bsky.feed.defs#notFoundPost' ||
				curr.$type === 'app.bsky.feed.defs#blockedPost'
			) {
				break;
			}

			const post = curr.post;

			if (i !== 0) {
				items[i - 1].parent = post;
			}

			if (++i > il) {
				break;
			}

			const author = post.author;
			if (!allowUnauthenticated && author.labels?.some((def) => def.val === '!no-unauthenticated')) {
				break;
			}

			items.push({ post: post, parent: null });
			curr = curr.parent;
		}
		return items.reverse();
	};
</script>

<script lang="ts">
	import EmbedFrame from 'internal/components/embed-frame.svelte';
	import HighlightedPost from 'internal/components/highlighted-post.svelte';
	import Post from 'internal/components/post.svelte';

	import { NO_UNAUTHENTICATED_LABEL } from 'internal/utils/constants.js';
	import type { PostData } from 'internal/types/post.js';

	const { thread, contextless, allowUnauthenticated }: PostData = $props();

	const isPwiForbidden =
		!allowUnauthenticated &&
		thread !== null &&
		thread.$type === 'app.bsky.feed.defs#threadViewPost' &&
		thread.post.author.labels?.some((label) => label.val === NO_UNAUTHENTICATED_LABEL);
</script>

{#if thread === null}
	{@render Message(`The post can't be found, it may have been deleted.`)}
{:else if isPwiForbidden}
	{@render Message(`The author has requested for their posts to not be displayed on external sites.`)}
{:else}
	{@const posts = unwrapPostThread(thread, contextless, allowUnauthenticated)}

	<EmbedFrame>
		{#each posts as { post, parent }, idx}
			{@const hasPrevious = idx !== 0}

			{#if idx === posts.length - 1}
				<HighlightedPost {post} {parent} prev={hasPrevious} />
			{:else}
				<Post {post} {parent} prev={hasPrevious} />
			{/if}
		{/each}
	</EmbedFrame>
{/if}

{#snippet Message(msg: string)}
	<EmbedFrame>
		<div class="message">{msg}</div>
	</EmbedFrame>
{/snippet}

<style>
	.message {
		margin: 0 auto;
		padding: 32px 16px;
		max-width: 380px;
		color: var(--text-secondary);
		text-align: center;
	}
</style>
