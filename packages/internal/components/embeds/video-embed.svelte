<script lang="ts">
	import type { AppBskyEmbedVideo, AppBskyFeedDefs } from '@atcute/bluesky';

	import { getPostUrl } from '../../utils/bsky-url';
	import { parseAtUri } from '../../utils/syntax/at-url';

	interface Props {
		post?: AppBskyFeedDefs.PostView;
		embed: AppBskyEmbedVideo.View;
		borderless?: boolean;
		standalone?: boolean;
		blur?: boolean;
	}

	const { post, embed: video, borderless, standalone, blur }: Props = $props();

	const ratio = standalone && video.aspectRatio;

	const postUrl = post && getPostUrl(post.author.did, parseAtUri(post.uri).rkey);
</script>

{#if standalone}
	<a
		target="_blank"
		href={postUrl}
		class={`bsky-video-embed` +
			(!borderless ? ` bsky-video-embed--bordered` : ``) +
			(standalone ? ` bsky-video-embed--standalone` : ``)}
	>
		<div
			class="bsky-video-embed__constrainer"
			style={ratio ? `aspect-ratio: ${ratio.width}/${ratio.height}` : ``}
		>
			{@render Content()}
		</div>
	</a>
{:else}
	<div
		class={`bsky-video-embed` + (!borderless ? ` bsky-video-embed--bordered` : ``)}
		style={ratio ? `aspect-ratio: ${ratio.width}/${ratio.height}` : ``}
	>
		{@render Content()}
	</div>
{/if}

{#snippet Content()}
	<img
		loading="lazy"
		src={video.thumbnail}
		alt=""
		class={`bsky-video-embed__thumbnail` + (blur ? ` bsky-video-embed__thumbnail--blurred` : ``)}
	/>

	{#if ratio}
		<div class="bsky-video-embed__placeholder"></div>
	{/if}

	<div class="bsky-video-embed__play">
		<!-- play -->
		<svg class="bsky-icon bsky-video-embed__play-icon" fill="none" viewBox="0 0 24 24">
			<path fill="currentColor" d="M22 12 5 2v20l17-10Z" />
		</svg>
	</div>
{/snippet}

<style>
	:global .bluesky-embed {
		.bsky-video-embed {
			display: block;
			position: relative;
			background: #000000;
			aspect-ratio: 16 / 9;
			overflow: hidden;
		}
		.bsky-video-embed--bordered {
			border: 1px solid var(--divider);
			border-radius: 6px;
		}
		.bsky-video-embed--standalone {
			align-self: baseline;
			aspect-ratio: auto;
			max-width: 100%;
		}

		.bsky-video-embed__constrainer {
			min-width: 64px;
			max-width: 100%;
			min-height: 64px;
			max-height: 320px;
		}

		.bsky-video-embed__thumbnail {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
		.bsky-video-embed__thumbnail--blurred {
			scale: 125%;
			filter: blur(24px);
		}

		.bsky-video-embed__placeholder {
			width: 100vw;
			height: 100vh;
		}

		.bsky-video-embed__play {
			display: grid;
			position: absolute;
			top: 50%;
			left: 50%;
			place-items: center;
			translate: -50% -50%;
			border-radius: 50%;
			background: rgba(64, 64, 64, 0.6);
			aspect-ratio: 1 / 1;
			height: 40%;
			max-height: 48px;
			color: #ffffff;
			font-size: 20px;

			.bsky-video-embed--standalone &:hover {
				background: rgba(64, 64, 64, 0.8);
			}
		}
		.bsky-video-embed__play-icon {
			width: 40%;
			height: 40%;
		}
	}
</style>
