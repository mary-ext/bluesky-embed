<script lang="ts">
	import { type AppBskyEmbedRecord, type AppBskyFeedPost, unwrapMediaEmbed } from '@atcute/bluesky';

	import { getPostUrl } from '../../utils/bsky-url';
	import { formatShortDate } from '../../utils/date';
	import { getEmbedImages } from '../../utils/embeds';
	import { findLabel } from '../../utils/labels';
	import { parseAtUri } from '../../utils/syntax/at-url';

	import GalleryEmbed from './gallery-embed.svelte';
	import SingleImageEmbed from './single-image-embed.svelte';
	import VideoEmbed from './video-embed.svelte';

	interface Props {
		embed: AppBskyEmbedRecord.ViewRecord;
		large?: boolean;
	}

	const { embed: quote, large = false }: Props = $props();

	const record = quote.value as AppBskyFeedPost.Main;
	const text = record.text.trim();

	const author = quote.author;
	const authorName = author.displayName?.trim();

	const media = unwrapMediaEmbed(quote.embeds?.[0]);
	const images = getEmbedImages(media);
	const video = media?.$type === 'app.bsky.embed.video#view' ? media : undefined;

	const postUrl = getPostUrl(author.did, parseAtUri(quote.uri).rkey);

	const isMediaBlurred = !!findLabel(quote.labels, author.did);
</script>

<a target="_blank" href={postUrl} class="bsky-quote-embed">
	<div class="bsky-quote-embed__meta">
		<div class="bsky-quote-embed__avatar-wrapper">
			{#if author.avatar}
				<img loading="lazy" src={author.avatar} alt="" class="bsky-quote-embed__avatar" />
			{/if}
		</div>

		<span class="bsky-quote-embed__name-wrapper">
			{#if authorName}
				<bdi class="bsky-quote-embed__display-name-wrapper">
					<span class="bsky-quote-embed__display-name">{authorName}</span>
				</bdi>
			{/if}

			<span class="bsky-quote-embed__handle">@{author.handle}</span>
		</span>

		<span aria-hidden="true" class="bsky-quote-embed__dot">·</span>

		<time datetime={record.createdAt} class="bsky-quote-embed__date">
			{formatShortDate(record.createdAt)}
		</time>
	</div>

	{#if text}
		<div class="bsky-quote-embed__body">
			{#if !large}
				{#if images.length !== 0}
					<div class="bsky-quote-embed__aside">
						<!-- a scrolling strip is too cramped at this size, the leading image stands in for the rest -->
						<SingleImageEmbed image={images[0]} blur={isMediaBlurred} />
					</div>
				{:else if video}
					<div class="bsky-quote-embed__aside">
						<VideoEmbed embed={video} blur={isMediaBlurred} />
					</div>
				{/if}
			{/if}

			<p class="bsky-quote-embed__text">{text}</p>
		</div>
	{:else}
		<div class="bsky-quote-embed__divide"></div>
	{/if}

	{#if large || !text}
		{#if images.length === 1}
			<SingleImageEmbed image={images[0]} borderless blur={isMediaBlurred} />
		{:else if images.length !== 0}
			<div class="bsky-quote-embed__gallery">
				<GalleryEmbed {images} blur={isMediaBlurred} />
			</div>
		{:else if video}
			<VideoEmbed embed={video} borderless blur={isMediaBlurred} />
		{/if}
	{/if}
</a>

<style>
	:global .bluesky-embed {
		.bsky-quote-embed {
			display: block;
			border: 1px solid var(--divider);
			border-radius: 6px;
			overflow: hidden;

			&:hover {
				border-color: var(--divider-hover);
			}
		}

		.bsky-quote-embed__meta {
			display: flex;
			padding: 12px 12px 0 12px;
			color: var(--text-secondary);
		}

		.bsky-quote-embed__avatar-wrapper {
			flex-shrink: 0;
			margin: 0 8px 0 0;
			border-radius: 9999px;
			background: var(--background-secondary);
			width: 20px;
			height: 20px;
			overflow: hidden;
		}
		.bsky-quote-embed__avatar {
			width: 100%;
			height: 100%;
		}

		.bsky-quote-embed__name-wrapper {
			display: flex;
			gap: 4px;
			max-width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.bsky-quote-embed__display-name-wrapper {
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.bsky-quote-embed__display-name {
			color: var(--text-primary);
			font-weight: 700;
		}
		.bsky-quote-embed__handle {
			display: block;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.bsky-quote-embed__dot {
			flex-shrink: 0;
			margin: 0 6px;
		}

		.bsky-quote-embed__date {
			white-space: nowrap;
		}

		.bsky-quote-embed__body {
			display: flex;
			align-items: flex-start;
		}

		.bsky-quote-embed__aside {
			flex-grow: 1;
			flex-basis: 0;
			margin: 8px 0 12px 12px;
			max-width: 20%;
		}

		.bsky-quote-embed__text {
			display: -webkit-box;
			margin: 8px 12px 12px 12px;
			overflow: hidden;
			-webkit-box-orient: vertical;
			flex-grow: 4;
			flex-basis: 0px;
			min-width: 0px;
			-webkit-line-clamp: 6;
			line-clamp: 6;
			white-space: pre-wrap;
			overflow-wrap: break-word;
		}

		.bsky-quote-embed__divide {
			padding: 6px 0;
		}

		.bsky-quote-embed__gallery {
			/* bleed out to the quote's edges rather than the parent post's */
			--bleed-start: 12px;
			--bleed-end: 12px;

			padding: 0 var(--bleed-end) 12px var(--bleed-start);
		}
	}
</style>
