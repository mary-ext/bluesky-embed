<script lang="ts">
	import type { AppBskyEmbedVideo, AppBskyFeedDefs } from '@atcute/client/lexicons';

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
		class={`video-embed` + (!borderless ? ` is-bordered` : ``) + (standalone ? ` is-standalone` : ``)}
	>
		<div class="constrainer" style={ratio ? `aspect-ratio: ${ratio.width}/${ratio.height}` : ``}>
			{@render Content()}
		</div>
	</a>
{:else}
	<div
		class={`video-embed` + (!borderless ? ` is-bordered` : ``)}
		style={ratio ? `aspect-ratio: ${ratio.width}/${ratio.height}` : ``}
	>
		{@render Content()}
	</div>
{/if}

{#snippet Content()}
	<img loading="lazy" src={video.thumbnail} alt="" class={`thumbnail` + (blur ? ` is-blurred` : ``)} />

	{#if ratio}
		<div class="placeholder"></div>
	{/if}

	<div class="play">
		<!-- play -->
		<svg class="icon" fill="none" viewBox="0 0 24 24">
			<path fill="currentColor" d="M22 12 5 2v20l17-10Z" />
		</svg>
	</div>
{/snippet}

<style>
	.video-embed {
		display: block;
		position: relative;
		background: #000000;
		aspect-ratio: 16 / 9;
		overflow: hidden;
	}
	.is-bordered {
		border: 1px solid var(--divider);
		border-radius: 6px;
	}
	.is-standalone {
		align-self: baseline;
		aspect-ratio: auto;
		max-width: 100%;
	}

	.constrainer {
		min-width: 64px;
		max-width: 100%;
		min-height: 64px;
		max-height: 320px;
	}

	.thumbnail {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.is-blurred {
		scale: 125%;
		filter: blur(24px);
	}

	.placeholder {
		width: 100vw;
		height: 100vh;
	}

	.play {
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

		.icon {
			width: 40%;
			height: 40%;
		}

		.is-standalone &:hover {
			background: rgba(64, 64, 64, 0.8);
		}
	}
</style>
