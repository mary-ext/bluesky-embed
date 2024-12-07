<script lang="ts">
	import type { AppBskyEmbedImages } from '@atcute/client/lexicons';

	interface Props {
		embed: AppBskyEmbedImages.View;
		borderless?: boolean;
		standalone?: boolean;
		blur?: boolean;
	}

	const { embed, borderless, standalone, blur }: Props = $props();

	const images = embed.images;
	const length = images.length;
</script>

<div
	class={'image-embed' +
		(!borderless ? ` is-bordered` : ``) +
		(standalone && length === 1 ? ` is-aligned` : ``)}
>
	{#if length === 4}
		<div class="grid">
			<div class="col">
				<div class="item wide">
					{@render Image(images[0])}
				</div>
				<div class="item wide">
					{@render Image(images[1])}
				</div>
			</div>
			<div class="col">
				<div class="item wide">
					{@render Image(images[2])}
				</div>
				<div class="item wide">
					{@render Image(images[3])}
				</div>
			</div>
		</div>
	{:else if length === 3}
		<div class="grid">
			<div class="col square">
				<div class="item">
					{@render Image(images[0])}
				</div>
			</div>
			<div class="col square">
				<div class="item">
					{@render Image(images[1])}
				</div>
				<div class="item">
					{@render Image(images[2])}
				</div>
			</div>
		</div>
	{:else if length === 2}
		<div class="grid">
			<div class="col">
				<div class="item square">
					{@render Image(images[0])}
				</div>
			</div>
			<div class="col">
				<div class="item square">
					{@render Image(images[1])}
				</div>
			</div>
		</div>
	{:else if length === 1}
		{@const image = images[0]}
		{@const ratio = standalone && image.aspectRatio}

		<div
			class={`single-item` + (ratio ? ` is-standalone` : ``)}
			style={ratio ? `aspect-ratio: ${ratio.width}/${ratio.height}` : ``}
		>
			{@render Image(image)}

			{#if ratio}
				<div class="placeholder"></div>
			{/if}
		</div>
	{/if}
</div>

{#snippet Image(image: AppBskyEmbedImages.ViewImage)}
	<img loading="lazy" src={image.thumb} alt={image.alt} class={`image` + (blur ? ` is-blurred` : ``)} />
{/snippet}

<style>
	.is-bordered {
		border: 1px solid var(--divider);
		border-radius: 6px;
		overflow: hidden;
	}
	.is-aligned {
		align-self: baseline;
		max-width: 100%;
	}

	.grid {
		display: flex;
		gap: 2px;
	}
	.col {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 2px;
	}

	.square {
		aspect-ratio: 1;
	}
	.wide {
		aspect-ratio: 1.5;
	}

	.item {
		position: relative;
		flex-grow: 1;
		flex-shrink: 0;
		overflow: hidden;
	}

	.single-item {
		position: relative;
		aspect-ratio: 16 / 9;
		overflow: hidden;

		.image {
			object-fit: contain;
		}
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
		object-fit: cover;
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
