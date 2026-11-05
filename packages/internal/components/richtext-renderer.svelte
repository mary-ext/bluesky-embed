<script lang="ts" module>
	import type { AppBskyRichtextFacet } from '@atcute/bluesky';
	import { segmentize } from '@atcute/bluesky-richtext-segmenter';

	import { getHashtagUrl, getProfileUrl } from '../utils/bsky-url';

	type Facet = AppBskyRichtextFacet.Main;
	type FacetFeature = Facet['features'][number];

	const grabFirstSupported = (features: FacetFeature[] | undefined): FacetFeature | undefined => {
		return features?.find(
			(feature) =>
				feature.$type === 'app.bsky.richtext.facet#link' ||
				feature.$type === 'app.bsky.richtext.facet#mention' ||
				feature.$type === 'app.bsky.richtext.facet#tag',
		);
	};
</script>

<script lang="ts">
	interface Props {
		text: string;
		facets?: Facet[];
		large?: boolean;
	}

	const { text, facets, large }: Props = $props();
</script>

<p class={`bsky-rich-text` + (large ? ` bsky-rich-text--large` : ``)}>
	{#each segmentize(text, facets) as segment}
		{@const feature = grabFirstSupported(segment.features)}

		{#if !feature}
			{segment.text}
		{:else if feature.$type === 'app.bsky.richtext.facet#link'}
			<a target="_blank" href={feature.uri} rel="noopener nofollow" class="bsky-rich-text__link"
				>{segment.text}</a
			>
		{:else if feature.$type === 'app.bsky.richtext.facet#mention'}
			<a target="_blank" href={getProfileUrl(feature.did)} class="bsky-rich-text__mention">{segment.text}</a>
		{:else if feature.$type === 'app.bsky.richtext.facet#tag'}
			<a target="_blank" href={getHashtagUrl(feature.tag)} class="bsky-rich-text__hashtag">{segment.text}</a>
		{/if}
	{/each}
</p>

<!-- shares the `bsky-rich-text` block with richtext-raw-renderer.svelte, keep the two in sync -->
<style>
	:global .bluesky-embed {
		.bsky-rich-text {
			overflow: hidden;
			white-space: pre-wrap;
			overflow-wrap: break-word;

			&:empty {
				display: none;
			}
		}
		.bsky-rich-text--large {
			font-size: calc(var(--font-size) * 1);
			line-height: calc(var(--font-size) * 1.5);
		}

		.bsky-rich-text__link,
		.bsky-rich-text__mention,
		.bsky-rich-text__hashtag {
			color: var(--text-link);

			&:hover {
				text-decoration: underline;
			}
		}
	}
</style>
