<script lang="ts">
	import type { AppBskyEmbedExternal } from '@atcute/bluesky';

	import { safeParseUrl } from '../../utils/url';

	interface Props {
		embed: AppBskyEmbedExternal.View;
	}

	const { embed }: Props = $props();

	const external = embed.external;

	const domain = safeParseUrl(external.uri)?.host;
</script>

<a
	target="_blank"
	href={domain && external.uri}
	rel="noopener noreferrer nofollow"
	class="bsky-external-embed"
>
	{#if external.thumb}
		<img loading="lazy" src={external.thumb} alt="" class="bsky-external-embed__thumbnail" />
	{/if}

	<div class="bsky-external-embed__meta">
		<p class="bsky-external-embed__title">{external.title}</p>
		<p class="bsky-external-embed__description">{external.description}</p>

		{#if domain}
			<div class="bsky-external-embed__domain">
				<!-- earth -->
				<svg class="bsky-icon" fill="none" viewBox="0 0 24 24">
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-width="2"
						d="m4.172 8.07 3.94 2.957.977-1.941 3.887-.978 1.15-4.6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-6.078 4.865.973-1.946-2.869-1.928-1.89-.12-1.08 1.075 1.947 2.919h2.919Z"
					/>
				</svg>

				<span class="bsky-external-embed__domain-name">{domain}</span>
			</div>
		{/if}
	</div>
</a>

<style>
	:global .bluesky-embed {
		.bsky-external-embed {
			display: block;
			border: 1px solid var(--divider);
			border-radius: 6px;
			overflow: hidden;

			&:hover {
				border-color: var(--divider-hover);
			}
		}

		.bsky-external-embed__thumbnail {
			display: block;
			border-bottom: 1px solid var(--divider);
			background: #000000;
			aspect-ratio: 1.91;
			width: 100%;

			.bsky-external-embed:hover & {
				border-color: var(--divider-hover);
			}
		}

		.bsky-external-embed__meta {
			padding: 12px;
		}

		.bsky-external-embed__title {
			display: -webkit-box;
			overflow: hidden;
			font-weight: 700;
			white-space: pre-wrap;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			overflow-wrap: break-word;

			&:empty {
				display: none;
			}
		}
		.bsky-external-embed__description {
			display: -webkit-box;
			overflow: hidden;
			color: var(--text-secondary);
			font-size: calc(var(--font-size) * 0.8125);
			white-space: pre-wrap;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			overflow-wrap: break-word;

			&:empty {
				display: none;
			}
		}

		.bsky-external-embed__domain {
			display: flex;
			align-items: center;
			gap: 6px;
			margin: 6px 0 0 0;
			color: var(--text-secondary);
			font-weight: 500;
			font-size: calc(var(--font-size) * 0.75);
		}
	}
</style>
