<script lang="ts">
	import type { AppBskyFeedDefs, AppBskyFeedPost } from '@atcute/client/lexicons';

	import { getPostUrl, getProfileUrl } from '../utils/bsky-url';
	import { formatLongDate } from '../utils/date';
	import { formatCompactNumber, formatLongNumber } from '../utils/number';
	import { parseAtUri } from '../utils/syntax/at-url';

	import Embeds from './embeds/embeds.svelte';
	import RichTextRenderer from './richtext-renderer.svelte';

	interface Props {
		post: AppBskyFeedDefs.PostView;
		parent: AppBskyFeedDefs.PostView | null;
		prev?: boolean;
	}

	const { post, parent, prev = false }: Props = $props();

	const author = post.author;
	const authorUrl = getProfileUrl(author.did);
	const authorName = author.displayName?.trim();

	const record = post.record as AppBskyFeedPost.Record;
	const postUrl = getPostUrl(author.did, parseAtUri(post.uri).rkey);

	const replyCount = post.replyCount || 0;
	const likeCount = post.likeCount || 0;
	const repostCount = (post.repostCount || 0) + (post.quoteCount || 0);
</script>

<div class="highlighted-post">
	<div class="meta">
		<a href={authorUrl} target="_blank" class="avatar-wrapper">
			{#if author.avatar}
				<!-- svelte-ignore a11y_missing_attribute -->
				<img loading="lazy" src={author.avatar} class="avatar" />
			{/if}
		</a>

		<a href={authorUrl} target="_blank" class="name-wrapper">
			{#if authorName}
				<bdi class="display-name-wrapper">
					<span class="display-name">{authorName}</span>
				</bdi>
			{/if}
			<span class="handle">@{author.handle}</span>
		</a>
	</div>

	{#if !prev && record.reply}
		<p class="context">
			{#if parent}
				{@const author = parent.author}

				Replying to
				<a target="_blank" href={getProfileUrl(author.did)} dir="auto">
					{author.displayName?.trim() || `@${author.handle}`}
				</a>
			{:else}
				Replying to an unknown post
			{/if}
		</p>
	{/if}

	<RichTextRenderer text={record.text} facets={record.facets} large />

	{#if post.embed}
		<Embeds {post} embed={post.embed} large />
	{/if}

	<time datetime={record.createdAt} class="date">
		{formatLongDate(record.createdAt)}
	</time>

	<div class="stats">
		<span
			class="stat"
			title={likeCount === 1 ? `${formatLongNumber(likeCount)} like` : `${formatLongNumber(likeCount)} likes`}
		>
			<!-- heart-2 -->
			<svg class="icon" fill="none" viewBox="0 0 24 24">
				<path
					stroke="currentColor"
					stroke-width="2"
					d="M12 5.768c6.162-6.25 16.725 5.358 0 14.732C-4.725 11.126 5.838-.482 12 5.768Z"
				/>
			</svg>

			<span>{formatCompactNumber(likeCount)}</span>
		</span>

		<span
			class="stat"
			title={repostCount === 1
				? `${formatLongNumber(repostCount)} repost`
				: `${formatLongNumber(repostCount)} reposts`}
		>
			<!-- arrows-repeat-right-left -->
			<svg class="icon" fill="none" viewBox="0 0 24 24">
				<path
					stroke="currentColor"
					stroke-linecap="square"
					stroke-width="2"
					d="m17 3 3 3-3 3M7 21l-3-3 3-3m-2 3h15v-5M4 11V6h15"
				/>
			</svg>

			<span>{formatCompactNumber(repostCount)}</span>
		</span>

		<div class="gap"></div>

		<a href={postUrl} target="_blank" class="permalink">
			<span>
				{!replyCount
					? `View on Bluesky`
					: replyCount === 1
						? `Read ${formatCompactNumber(replyCount)} reply on Bluesky`
						: `Read ${formatCompactNumber(replyCount)} replies on Bluesky`}
			</span>
		</a>
	</div>
</div>

<style>
	.highlighted-post {
		padding: 16px;
	}

	.meta {
		display: flex;
		align-items: center;
		margin: 0 0 12px 0;
		color: var(--text-secondary);

		.avatar-wrapper {
			display: block;
			flex-shrink: 0;
			margin: 0 12px 0 0;
			border-radius: 9999px;
			background: var(--background-secondary);
			width: 40px;
			height: 40px;
			overflow: hidden;

			&:hover {
				filter: brightness(0.85);
			}
		}
		.avatar {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.name-wrapper {
			display: block;
			max-width: 100%;
			overflow: hidden;
			color: inherit;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.display-name-wrapper {
			overflow: hidden;
			text-overflow: ellipsis;

			.name-wrapper:hover & {
				text-decoration: underline;
			}
		}
		.display-name {
			color: var(--text-primary);
			font-weight: 700;
		}
		.handle {
			display: block;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.context {
		overflow: hidden;
		color: var(--text-secondary);
		font-size: calc(var(--font-size) * 0.8125);
		text-overflow: ellipsis;
		white-space: nowrap;

		a {
			color: inherit;
			font-weight: 500;

			&:hover {
				text-decoration: underline;
			}
		}
	}

	.date {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		margin: 12px 0 0;
		border-bottom: 1px solid var(--divider);
		padding: 0 0 12px 0;
		color: var(--text-secondary);
	}

	.stats {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px 16px;
		margin: 0 0 -16px 0;
		padding: 12px 0;
		color: var(--text-secondary);

		.gap {
			flex: 1 1 auto;
		}

		.permalink {
			display: flex;
			align-items: center;
			gap: 4px;
			color: var(--text-link);
			font-weight: 700;

			&:hover {
				text-decoration: underline;
			}
		}
	}
	.stat {
		display: flex;
		align-items: center;
		gap: 8px;
		font-weight: 500;
	}
</style>
