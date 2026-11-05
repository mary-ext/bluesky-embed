<script lang="ts">
	import type { EmbedImage } from '../../utils/embeds';

	interface Props {
		image: EmbedImage;
		borderless?: boolean;
		standalone?: boolean;
		blur?: boolean;
	}

	const { image, borderless, standalone, blur }: Props = $props();
</script>

<div class={`bsky-single-image-embed` + (standalone ? ` bsky-single-image-embed--standalone` : ``)}>
	<div
		class={`bsky-single-image-embed__item` +
			(!borderless ? ` bsky-single-image-embed__item--bordered` : ``) +
			(standalone ? ` bsky-single-image-embed__item--standalone` : ``)}
		style={standalone && image.ratio !== undefined ? `aspect-ratio: ${image.ratio}` : ``}
	>
		<img
			loading="lazy"
			src={image.thumbnail}
			alt={image.alt}
			class={`bsky-single-image-embed__image` + (blur ? ` bsky-single-image-embed__image--blurred` : ``)}
		/>

		{#if standalone}
			<div class="bsky-single-image-embed__placeholder"></div>
		{/if}
	</div>
</div>

<style>
	:global .bluesky-embed {
		.bsky-single-image-embed--standalone {
			align-self: baseline;
			max-width: 100%;
		}

		.bsky-single-image-embed__item {
			position: relative;
			aspect-ratio: 16 / 9;
			overflow: hidden;
		}
		.bsky-single-image-embed__item--bordered {
			border: 1px solid var(--divider);
			border-radius: 6px;
		}
		.bsky-single-image-embed__item--standalone {
			min-width: 64px;
			max-width: 100%;
			min-height: 64px;
			max-height: 320px;
		}

		.bsky-single-image-embed__image {
			position: absolute;
			inset: 0;
			background: #000000;
			width: 100%;
			height: 100%;
			object-fit: contain;
			font-size: 0px;
		}
		.bsky-single-image-embed__image--blurred {
			scale: 125%;
			filter: blur(24px);
		}

		.bsky-single-image-embed__placeholder {
			width: 100vw;
			height: 100vh;
		}
	}
</style>
