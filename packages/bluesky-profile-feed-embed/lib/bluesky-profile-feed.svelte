<script lang="ts">
	import EmbedFrame from 'internal/components/embed-frame.svelte';
	import FeedPost from 'internal/components/feed-post.svelte';
	import ProfileFeedHeader from 'internal/components/profile-feed-header.svelte';

	import type { ProfileFeedData } from 'internal/types/profile-feed.js';
	import { NO_UNAUTHENTICATED_LABEL } from 'internal/utils/constants.js';

	const { profile, feed, allowUnauthenticated }: ProfileFeedData = $props();

	const isPwiForbidden =
		!allowUnauthenticated && profile?.labels?.some((label) => label.val === NO_UNAUTHENTICATED_LABEL);

	const items = feed.filter((item) => {
		if (!profile) {
			return false;
		}

		const reason = item.reason;
		if (reason) {
			if (reason.$type === 'app.bsky.feed.defs#reasonPin') {
				return true;
			}

			if (reason.$type === 'app.bsky.feed.defs#reasonRepost') {
				const author = item.post.author;

				if (author.did !== profile.did) {
					return (
						allowUnauthenticated || !author.labels?.some((label) => label.val === NO_UNAUTHENTICATED_LABEL)
					);
				}

				return true;
			}

			// Don't show anything we don't recognize
			return false;
		}

		return !item.reply;
	});
</script>

{#if profile === null}
	{@render Message(`The profile can't be found, it may have been deleted.`)}
{:else if isPwiForbidden}
	{@render Message(`The user has requested for their posts to not be displayed on external sites.`)}
{:else}
	<EmbedFrame>
		<ProfileFeedHeader {profile} />

		{#if items.length > 0}
			<div class="feed">
				{#each items as item}
					<FeedPost {item} />
				{/each}

				<div class="end-marker">
					<div class="dot"></div>
				</div>
			</div>
		{:else}
			<div class="message">This user has not made any posts.</div>
		{/if}
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

	.feed {
		max-height: var(--max-feed-height);
		overflow-y: auto;
	}
	.end-marker {
		display: grid;
		place-items: center;
		height: 48px;

		.dot {
			border-radius: 50%;
			background: var(--text-secondary);
			width: 4px;
			height: 4px;
		}
	}
</style>
