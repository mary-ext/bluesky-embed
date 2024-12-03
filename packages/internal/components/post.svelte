<script lang="ts">
	import type { AppBskyFeedDefs, AppBskyFeedPost } from '@atcute/client/lexicons';

	import { getPostUrl, getProfileUrl } from '../utils/bsky-url';
	import { formatLongDate, formatShortDate } from '../utils/date';
	import { parseAtUri } from '../utils/syntax/at-url';

	import Embeds from './embeds/embeds.svelte';
	import RichtextRenderer from './richtext-renderer.svelte';

	interface Props {
		post: AppBskyFeedDefs.PostView;
		parent?: AppBskyFeedDefs.PostView | null;
		prev?: boolean;
	}

	const { post, parent, prev }: Props = $props();

	const author = post.author;
	const authorUrl = getProfileUrl(author.did);
	const authorName = author.displayName?.trim();

	const record = post.record as AppBskyFeedPost.Record;
	const postUrl = getPostUrl(author.did, parseAtUri(post.uri).rkey);
</script>

<div class="post">
	<div class="aside">
		<a target="_blank" href={authorUrl} class="avatar-wrapper">
			{#if author.avatar}
				<img loading="lazy" src={author.avatar} alt="" class="avatar" />
			{/if}
		</a>

		<div class="line"></div>
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

		<RichtextRenderer text={record.text} facets={record.facets} />

		{#if post.embed}
			<Embeds {post} embed={post.embed} />
		{/if}
	</div>
</div>

<style>
	.post {
		display: flex;
		position: relative;
		gap: 12px;
		padding: 12px 16px 0 16px;
	}

	.aside {
		flex-shrink: 0;
	}

	.avatar-wrapper {
		display: block;
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

	.line {
		position: absolute;
		top: 56px;
		bottom: -12px;
		left: 35px;
		border-left: 2px solid var(--divider);
	}

	.main {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		min-width: 0px;
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
</style>
