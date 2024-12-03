<script lang="ts" module>
	const getPostImage = (embed: AppBskyFeedDefs.PostView['embed']): AppBskyEmbedImages.View | undefined => {
		if (embed) {
			if (embed.$type === 'app.bsky.embed.images#view') {
				return embed;
			}

			if (embed.$type === 'app.bsky.embed.recordWithMedia#view') {
				return getPostImage(embed.media);
			}
		}
	};

	const getPostVideo = (embed: AppBskyFeedDefs.PostView['embed']): AppBskyEmbedVideo.View | undefined => {
		if (embed) {
			if (embed.$type === 'app.bsky.embed.video#view') {
				return embed;
			}

			if (embed.$type === 'app.bsky.embed.recordWithMedia#view') {
				return getPostVideo(embed.media);
			}
		}
	};
</script>

<script lang="ts">
	import type {
		AppBskyEmbedImages,
		AppBskyEmbedRecord,
		AppBskyEmbedVideo,
		AppBskyFeedDefs,
		AppBskyFeedPost,
	} from '@atcute/client/lexicons';

	import { getPostUrl } from '../../utils/bsky-url';
	import { formatShortDate } from '../../utils/date';
	import { parseAtUri } from '../../utils/syntax/at-url';

	import ImageEmbed from './image-embed.svelte';
	import VideoEmbed from './video-embed.svelte';

	interface Props {
		embed: AppBskyEmbedRecord.ViewRecord;
		large?: boolean;
	}

	const { embed: quote, large = false }: Props = $props();

	const record = quote.value as AppBskyFeedPost.Record;
	const text = record.text.trim();

	const author = quote.author;
	const authorName = author.displayName?.trim();

	const embed = quote.embeds?.[0];
	const image = getPostImage(embed);
	const video = getPostVideo(embed);

	const postUrl = getPostUrl(author.did, parseAtUri(quote.uri).rkey);
</script>

<a target="_blank" href={postUrl} class="quote-embed">
	<div class="meta">
		<div class="avatar-wrapper">
			{#if author.avatar}
				<img loading="lazy" src={author.avatar} alt="" class="avatar" />
			{/if}
		</div>

		<span class="name-wrapper">
			{#if authorName}
				<bdi class="display-name-wrapper">
					<span class="display-name">{authorName}</span>
				</bdi>
			{/if}

			<span class="handle">@{author.handle}</span>
		</span>

		<span aria-hidden="true" class="dot">·</span>

		<time datetime={record.createdAt} class="date">
			{formatShortDate(record.createdAt)}
		</time>
	</div>

	{#if text}
		<div class="body">
			{#if !large}
				{#if image}
					<div class="aside">
						<ImageEmbed embed={image} />
					</div>
				{:else if video}
					<div class="aside">
						<VideoEmbed embed={video} />
					</div>
				{/if}
			{/if}

			<p class="text">{text}</p>
		</div>
	{:else}
		<div class="divide"></div>
	{/if}

	{#if large || !text}
		{#if image}
			<ImageEmbed embed={image} borderless />
		{:else if video}
			<VideoEmbed embed={video} borderless />
		{/if}
	{/if}
</a>

<style>
	.quote-embed {
		display: block;
		border: 1px solid var(--divider);
		border-radius: 6px;
		overflow: hidden;

		&:hover {
			border-color: var(--divider-hover);
		}
	}

	.meta {
		display: flex;
		padding: 12px 12px 0 12px;
		color: var(--text-secondary);

		.avatar-wrapper {
			flex-shrink: 0;
			margin: 0 8px 0 0;
			border-radius: 9999px;
			background: var(--background-secondary);
			width: 20px;
			height: 20px;
			overflow: hidden;
		}
		.avatar {
			width: 100%;
			height: 100%;
		}

		.name-wrapper {
			display: flex;
			gap: 4px;
			max-width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.display-name-wrapper {
			overflow: hidden;
			text-overflow: ellipsis;
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
			white-space: nowrap;
		}
	}

	.body {
		display: flex;
		align-items: flex-start;
	}

	.aside {
		flex-grow: 1;
		flex-basis: 0;
		margin: 8px 0 12px 12px;
		max-width: 20%;
	}

	.text {
		display: -webkit-box;
		margin: 8px 12px 12px 12px;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 6;
		line-clamp: 6;
		flex-grow: 4;
		flex-basis: 0px;
		min-width: 0px;
		white-space: pre-wrap;
		overflow-wrap: break-word;
	}

	.divide {
		padding: 6px 0;
	}
</style>
