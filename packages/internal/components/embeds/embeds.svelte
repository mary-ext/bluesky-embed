<script lang="ts" module>
	const collectionToLabel = (collection: string): string | null => {
		switch (collection) {
			case 'app.bsky.feed.post': {
				return 'post';
			}
			case 'app.bsky.feed.generator': {
				return 'feed';
			}
			case 'app.bsky.graph.list': {
				return 'list';
			}
			case 'app.bsky.graph.starterpack': {
				return 'starter pack';
			}
			case 'app.bsky.labeler.service': {
				return 'labeler';
			}
		}

		return null;
	};
</script>

<script lang="ts">
	import { type AppBskyFeedDefs, type MediaEmbed, type RecordEmbed, unwrapEmbed } from '@atcute/bluesky';

	import { findLabel } from '../../utils/labels';
	import { parseAtUri } from '../../utils/syntax/at-url';
	import ContentHider from '../content-hider.svelte';

	import ExternalEmbed from './external-embed.svelte';
	import FeedEmbed from './feed-embed.svelte';
	import ImageEmbed from './image-embed.svelte';
	import ListEmbed from './list-embed.svelte';
	import QuoteEmbed from './quote-embed.svelte';
	import StarterpackEmbed from './starterpack-embed.svelte';
	import VideoEmbed from './video-embed.svelte';

	type Embed = NonNullable<AppBskyFeedDefs.PostView['embed']>;

	interface Props {
		post?: AppBskyFeedDefs.PostView;
		embed: Embed;
		large?: boolean;
	}

	const { post, embed, large = false }: Props = $props();

	const { media, record } = unwrapEmbed(embed);
</script>

<div class="embeds">
	{#if media}
		{@render Media(media)}
	{/if}
	{#if record}
		{@render Record(record)}
	{/if}
</div>

{#snippet Media(embed: MediaEmbed)}
	{@const warning = post && findLabel(post.labels, post.author.did)}

	<ContentHider {warning}>
		{#if embed.$type === 'app.bsky.embed.external#view'}
			<ExternalEmbed {embed} />
		{:else if embed.$type === 'app.bsky.embed.images#view'}
			<ImageEmbed {embed} standalone />
		{:else if embed.$type === 'app.bsky.embed.video#view'}
			<VideoEmbed {post} {embed} standalone />
		{:else}
			{@render Message(`Unsupported media embed`)}
		{/if}
	</ContentHider>
{/snippet}

{#snippet Record(record: RecordEmbed)}
	{#if record.$type === 'app.bsky.embed.record#viewRecord'}
		<QuoteEmbed embed={record} {large} />
	{:else if record.$type === 'app.bsky.feed.defs#generatorView'}
		<FeedEmbed embed={record} />
	{:else if record.$type === 'app.bsky.graph.defs#listView'}
		<ListEmbed embed={record} />
	{:else if record.$type === 'app.bsky.graph.defs#starterPackViewBasic'}
		<StarterpackEmbed embed={record} {large} />
	{:else}
		{@const uri = parseAtUri(record.uri)}
		{@const resource = collectionToLabel(uri.collection)}

		{@const isUnavailable =
			resource &&
			(record.$type === 'app.bsky.embed.record#viewNotFound' ||
				record.$type === 'app.bsky.embed.record#viewBlocked' ||
				record.$type === 'app.bsky.embed.record#viewDetached')}

		{@render Message(isUnavailable ? `This ${resource} is unavailable` : `Unsupported record embed`)}
	{/if}
{/snippet}

{#snippet Message(message: string)}
	<div class="message">{message}</div>
{/snippet}

<style>
	.embeds {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin: 12px 0 0 0;
	}

	.message {
		border: 1px solid var(--divider);
		border-radius: 6px;
		padding: 12px;
		color: var(--text-secondary);
	}
</style>
