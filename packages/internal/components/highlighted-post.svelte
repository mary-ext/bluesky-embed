<script lang="ts">
	import type { AppBskyFeedDefs, AppBskyFeedPost } from '@atcute/bluesky';

	import { getPostUrl, getProfileUrl } from '../utils/bsky-url';
	import { formatLongDate } from '../utils/date';
	import { findLabel } from '../utils/labels';
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

	const record = post.record as AppBskyFeedPost.Main;
	const postUrl = getPostUrl(author.did, parseAtUri(post.uri).rkey);

	const replyCount = post.replyCount || 0;
	const likeCount = post.likeCount || 0;
	const repostCount = (post.repostCount || 0) + (post.quoteCount || 0);

	const isAuthorBlurred = !!findLabel(author.labels, author.did);
</script>

<div class="bsky-highlighted-post">
	<div class="bsky-highlighted-post__meta">
		<a href={authorUrl} target="_blank" class="bsky-highlighted-post__avatar-wrapper">
			{#if author.avatar}
				<img
					loading="lazy"
					src={author.avatar}
					alt=""
					class={`bsky-highlighted-post__avatar` +
						(isAuthorBlurred ? ` bsky-highlighted-post__avatar--blurred` : ``)}
				/>
			{/if}
		</a>

		<a href={authorUrl} target="_blank" class="bsky-highlighted-post__name-wrapper">
			{#if authorName}
				<bdi class="bsky-highlighted-post__display-name-wrapper">
					<span class="bsky-highlighted-post__display-name">{authorName}</span>
				</bdi>
			{/if}
			<span class="bsky-highlighted-post__handle">@{author.handle}</span>
		</a>

		{#if !prev}
			<svg class="bsky-highlighted-post__logo" fill="none" viewBox="0 0 320 286">
				<path
					fill="#0A7AFF"
					d="M69.364 19.146c36.687 27.806 76.147 84.186 90.636 114.439 14.489-30.253 53.948-86.633 90.636-114.439C277.107-.917 320-16.44 320 32.957c0 9.865-5.603 82.875-8.889 94.729-11.423 41.208-53.045 51.719-90.071 45.357 64.719 11.12 81.182 47.953 45.627 84.785-80 82.874-106.667-44.333-106.667-44.333s-26.667 127.207-106.667 44.333c-35.555-36.832-19.092-73.665 45.627-84.785-37.026 6.362-78.648-4.149-90.071-45.357C5.603 115.832 0 42.822 0 32.957 0-16.44 42.893-.917 69.364 19.147Z"
				/>
			</svg>
		{/if}
	</div>

	{#if !prev && record.reply}
		<p class="bsky-highlighted-post__context">
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

	<time datetime={record.createdAt} class="bsky-highlighted-post__date">
		{formatLongDate(record.createdAt)}
	</time>

	<div class="bsky-highlighted-post__stats">
		<span
			class="bsky-highlighted-post__stat"
			title={likeCount === 1 ? `${formatLongNumber(likeCount)} like` : `${formatLongNumber(likeCount)} likes`}
		>
			<!-- heart-2 -->
			<svg class="bsky-icon" fill="none" viewBox="0 0 24 24">
				<path
					stroke="currentColor"
					stroke-width="2"
					d="M12 5.768c6.162-6.25 16.725 5.358 0 14.732C-4.725 11.126 5.838-.482 12 5.768Z"
				/>
			</svg>

			<span>{formatCompactNumber(likeCount)}</span>
		</span>

		<span
			class="bsky-highlighted-post__stat"
			title={repostCount === 1
				? `${formatLongNumber(repostCount)} repost`
				: `${formatLongNumber(repostCount)} reposts`}
		>
			<!-- arrows-repeat-right-left -->
			<svg class="bsky-icon" fill="none" viewBox="0 0 24 24">
				<path
					stroke="currentColor"
					stroke-linecap="square"
					stroke-width="2"
					d="m17 3 3 3-3 3M7 21l-3-3 3-3m-2 3h15v-5M4 11V6h15"
				/>
			</svg>

			<span>{formatCompactNumber(repostCount)}</span>
		</span>

		<div class="bsky-highlighted-post__gap"></div>

		<a href={postUrl} target="_blank" class="bsky-highlighted-post__permalink">
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
	:global .bluesky-embed {
		.bsky-highlighted-post {
			--bleed-start: 16px;
			--bleed-end: 16px;

			padding: 16px;
		}

		.bsky-highlighted-post__meta {
			display: flex;
			align-items: center;
			gap: 12px;
			margin: 0 0 12px 0;
			color: var(--text-secondary);
		}

		.bsky-highlighted-post__avatar-wrapper {
			display: block;
			flex-shrink: 0;
			border-radius: 9999px;
			background: var(--background-secondary);
			width: 40px;
			height: 40px;
			overflow: hidden;

			&:hover {
				filter: brightness(0.85);
			}
		}

		.bsky-highlighted-post__avatar {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.bsky-highlighted-post__avatar--blurred {
			scale: 125%;
			filter: blur(4px);
		}

		.bsky-highlighted-post__name-wrapper {
			display: block;
			flex-grow: 1;
			max-width: 100%;
			overflow: hidden;
			color: inherit;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.bsky-highlighted-post__display-name-wrapper {
			overflow: hidden;
			text-overflow: ellipsis;

			.bsky-highlighted-post__name-wrapper:hover & {
				text-decoration: underline;
			}
		}
		.bsky-highlighted-post__display-name {
			color: var(--text-primary);
			font-weight: 700;
		}
		.bsky-highlighted-post__handle {
			display: block;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.bsky-highlighted-post__logo {
			width: 32px;
			height: 32px;
		}

		.bsky-highlighted-post__context {
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

		.bsky-highlighted-post__date {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 8px;
			margin: 12px 0 0;
			border-bottom: 1px solid var(--divider);
			padding: 0 0 12px 0;
			color: var(--text-secondary);
		}

		.bsky-highlighted-post__stats {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 8px 16px;
			margin: 0 0 -16px 0;
			padding: 12px 0;
			color: var(--text-secondary);
		}
		.bsky-highlighted-post__gap {
			flex: 1 1 auto;
		}
		.bsky-highlighted-post__permalink {
			display: flex;
			align-items: center;
			gap: 4px;
			color: var(--text-link);
			font-weight: 700;

			&:hover {
				text-decoration: underline;
			}
		}
		.bsky-highlighted-post__stat {
			display: flex;
			align-items: center;
			gap: 8px;
			font-weight: 500;
		}
	}
</style>
