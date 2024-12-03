<script lang="ts">
	import type { AppBskyFeedDefs, AppBskyFeedPost } from '@atcute/client/lexicons';

	import { getPostUrl, getProfileUrl } from '../utils/bsky-url';
	import { formatLongDate, formatShortDate } from '../utils/date';
	import { parseAtUri } from '../utils/syntax/at-url';

	import { formatCompactNumber, formatLongNumber } from '../utils/number';
	import Embeds from './embeds/embeds.svelte';
	import RichtextRenderer from './richtext-renderer.svelte';

	interface Props {
		item: AppBskyFeedDefs.FeedViewPost;
		prev?: boolean;
		next?: boolean;
	}

	const { item, prev = false, next = false }: Props = $props();

	const reason = item.reason;
	const post = item.post;
	const parent = item.reply?.parent;

	const author = post.author;
	const authorUrl = getProfileUrl(author.did);
	const authorName = author.displayName?.trim();

	const record = post.record as AppBskyFeedPost.Record;
	const postUrl = getPostUrl(author.did, parseAtUri(post.uri).rkey);

	const replyCount = post.replyCount || 0;
	const likeCount = post.likeCount || 0;
	const repostCount = (post.repostCount || 0) + (post.quoteCount || 0);
</script>

<div class={`feed-post` + (!next ? ` is-leaf` : ``)}>
	<div class="contexts">
		{#if prev}
			<div class="ascendant-line-wrapper">
				<div class="line"></div>
			</div>
		{/if}

		{#if reason}
			{#if reason.$type === 'app.bsky.feed.defs#reasonRepost'}
				{@const by = reason.by}

				<div class="context">
					<div class="aside">
						<svg class="icon" viewBox="0 0 24 24" fill="none">
							<path
								d="M17 3L20 6L17 9M7 21L4 18L7 15M5 18H20V13M4 11V6H19"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="square"
							/>
						</svg>
					</div>
					<a href={getProfileUrl(by.did)} class="main">
						<span dir="auto" class="name">{by.displayName}</span>
						<span class="affix">{' '}reposted</span>
					</a>
				</div>
			{:else if reason.$type === 'app.bsky.feed.defs#reasonPin'}
				<div class="context">
					<div class="aside">
						<svg class="icon" fill="none" viewBox="0 0 24 24">
							<path
								stroke="currentColor"
								stroke-linecap="square"
								stroke-width="2"
								d="M12 15H5v-2.5l.377-.377A7.25 7.25 0 0 0 7.5 6.997V3h9v3.997a7.25 7.25 0 0 0 2.123 5.127L19 12.5V15h-7Zm0 0v6"
							/>
						</svg>
					</div>
					<span class="flex min-w-0">Pinned</span>
				</div>
			{/if}
		{/if}
	</div>

	<div class="content">
		<div class="aside">
			<a target="_blank" href={authorUrl} class="avatar-wrapper">
				{#if author.avatar}
					<img loading="lazy" src={author.avatar} alt="" class="avatar" />
				{/if}
			</a>

			{#if next}
				<div class="descendant-line"></div>
			{/if}
		</div>

		<div class="main">
			<div class="meta">
				<a href={authorUrl} target="_blank" class="name-wrapper">
					{#if authorName}
						<bdi class="display-name-wrapper">
							<span class="display-name">{authorName}</span>
						</bdi>
					{/if}

					<span class="handle">@{author.handle}</span>
				</a>

				<span aria-hidden="true" class="dot"> · </span>

				<a target="_blank" href={postUrl} title={formatLongDate(record.createdAt)} class="date">
					<time datetime={record.createdAt}>{formatShortDate(record.createdAt)}</time>
				</a>
			</div>

			{#if !prev && record.reply}
				<p class="reply-context">
					{#if parent && parent.$type === 'app.bsky.feed.defs#postView'}
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

			<RichtextRenderer text={record.text} facets={record.facets} />

			{#if post.embed}
				<Embeds {post} embed={post.embed} />
			{/if}

			<div class="metrics">
				<div
					title={replyCount === 1
						? `${formatLongNumber(replyCount)} reply`
						: `${formatLongNumber(replyCount)} replies`}
					class="stat"
				>
					<svg class="icon" fill="none" viewBox="0 0 24 24">
						<path
							stroke="currentColor"
							stroke-linecap="square"
							stroke-width="2"
							d="M3.002 4h18v14h-9l-5 3v-3h-4V4Z"
						/>
					</svg>

					<span class="count">
						{formatCompactNumber(replyCount)}
					</span>
				</div>

				<div
					title={repostCount === 1
						? `${formatLongNumber(repostCount)} repost`
						: `${formatLongNumber(repostCount)} reposts`}
					class="stat"
				>
					<svg class="icon" fill="none" viewBox="0 0 24 24">
						<path
							stroke="currentColor"
							stroke-linecap="square"
							stroke-width="2"
							d="m17 3 3 3-3 3M7 21l-3-3 3-3m-2 3h15v-5M4 11V6h15"
						/>
					</svg>

					<span class="count">
						{formatCompactNumber(repostCount)}
					</span>
				</div>

				<div
					title={likeCount === 1
						? `${formatLongNumber(likeCount)} like`
						: `${formatLongNumber(likeCount)} likes`}
					class="stat"
				>
					<svg class="icon" fill="none" viewBox="0 0 24 24">
						<path
							stroke="currentColor"
							stroke-width="2"
							d="M12 5.768c6.162-6.25 16.725 5.358 0 14.732C-4.725 11.126 5.838-.482 12 5.768Z"
						/>
					</svg>

					<span class="count">
						{formatCompactNumber(likeCount)}
					</span>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.feed-post {
		padding: 0 16px;
	}
	.is-leaf {
		border-bottom: 1px solid var(--divider);
	}

	.ascendant-line-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 36px;

		.line {
			position: absolute;
			top: 0;
			bottom: 4px;
			flex-grow: 1;
			border-left: 2px solid var(--divider);
		}
	}
	.descendant-line {
		flex-grow: 1;
		margin-top: 4px;
		border-left: 2px solid var(--divider);
	}

	.contexts {
		display: flex;
		position: relative;
		flex-direction: column;
		padding: 8px 0 4px 0;
	}
	.context {
		display: flex;
		align-items: center;
		gap: 12px;
		color: var(--text-secondary);
		font-size: 0.8125rem;
		line-height: 1.25rem;

		.aside {
			display: flex;
			flex-shrink: 0;
			justify-content: flex-end;
			width: 36px;
		}

		.main {
			display: flex;
			min-width: 0px;

			&:hover {
				text-decoration-line: underline;
			}
		}

		.name {
			overflow: hidden;
			font-weight: 500;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.affix {
			flex-shrink: 0;
			white-space: pre;
		}
	}

	.content {
		display: flex;
		gap: 12px;

		.aside {
			display: flex;
			flex-shrink: 0;
			flex-direction: column;
			align-items: center;
		}

		.main {
			flex-grow: 1;
			padding-bottom: 12px;
			min-width: 0;
		}
	}

	.avatar-wrapper {
		display: block;
		border-radius: 9999px;
		background: var(--background-secondary);
		width: 36px;
		height: 36px;
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

	.meta {
		display: flex;
		align-items: center;
		margin: 0 0 2px 0;
		color: var(--text-secondary);

		.name-wrapper {
			display: flex;
			gap: 4px;
			max-width: 100%;
			overflow: hidden;
			color: inherit;
			text-decoration: none;
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

		.dot {
			flex-shrink: 0;
			margin: 0 6px;
		}

		.date {
			color: inherit;
			text-decoration: none;
			white-space: nowrap;

			&:hover {
				text-decoration: underline;
			}
		}
	}

	.reply-context {
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

	.metrics {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-top: 12px;
		color: var(--text-secondary);
	}
	.stat {
		display: flex;
		align-items: center;
		gap: 8px;
		min-width: 0px;
		max-width: 100%;

		.count {
			padding-right: 8px;
			overflow: hidden;
			font-size: 0.8125rem;
			line-height: 1.25rem;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
</style>
