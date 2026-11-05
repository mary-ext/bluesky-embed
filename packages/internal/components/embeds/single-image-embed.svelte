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

<div class={`single-image-embed` + (standalone ? ` is-aligned` : ``)}>
	<div
		class={`item` + (!borderless ? ` is-bordered` : ``) + (standalone ? ` is-standalone` : ``)}
		style={standalone && image.ratio !== undefined ? `aspect-ratio: ${image.ratio}` : ``}
	>
		<img loading="lazy" src={image.thumbnail} alt={image.alt} class={`image` + (blur ? ` is-blurred` : ``)} />

		{#if standalone}
			<div class="placeholder"></div>
		{/if}
	</div>
</div>

<style>
	.is-aligned {
		align-self: baseline;
		max-width: 100%;
	}

	.item {
		position: relative;
		aspect-ratio: 16 / 9;
		overflow: hidden;
	}
	.is-bordered {
		border: 1px solid var(--divider);
		border-radius: 6px;
	}
	.is-standalone {
		min-width: 64px;
		max-width: 100%;
		min-height: 64px;
		max-height: 320px;
	}

	.image {
		position: absolute;
		inset: 0;
		background: #000000;
		width: 100%;
		height: 100%;
		object-fit: contain;
		font-size: 0px;
	}
	.is-blurred {
		scale: 125%;
		filter: blur(24px);
	}

	.placeholder {
		width: 100vw;
		height: 100vh;
	}
</style>
