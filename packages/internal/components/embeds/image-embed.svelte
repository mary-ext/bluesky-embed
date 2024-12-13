<script lang="ts" module>
	const DEFAULT_RATIO = { width: 16, height: 9 };
</script>

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
				<div class="item wide tl">
					{@render Image(0)}
				</div>
				<div class="item wide bl">
					{@render Image(2)}
				</div>
			</div>
			<div class="col">
				<div class="item wide tr">
					{@render Image(1)}
				</div>
				<div class="item wide br">
					{@render Image(3)}
				</div>
			</div>
		</div>
	{:else if length === 3}
		<div class="grid">
			<div class="col square">
				<div class="item tl bl">
					{@render Image(0)}
				</div>
			</div>
			<div class="col square">
				<div class="item tr">
					{@render Image(1)}
				</div>
				<div class="item br">
					{@render Image(2)}
				</div>
			</div>
		</div>
	{:else if length === 2}
		<div class="grid">
			<div class="col">
				<div class="item square tl bl">
					{@render Image(0)}
				</div>
			</div>
			<div class="col">
				<div class="item square tr br">
					{@render Image(1)}
				</div>
			</div>
		</div>
	{:else if length === 1}
		{@const ratio = standalone && (images[0].aspectRatio || DEFAULT_RATIO)}

		<div
			class={`single-item tl tr bl br` + (ratio ? ` is-standalone` : ``)}
			style={ratio ? `aspect-ratio: ${ratio.width}/${ratio.height}` : ``}
		>
			{@render Image(0)}

			{#if ratio}
				<div class="placeholder"></div>
			{/if}
		</div>
	{/if}
</div>

{#snippet Image(index: number)}
	{@const image = images[index]}

	<img loading="lazy" src={image.thumb} alt={image.alt} class={`image` + (blur ? ` is-blurred` : ``)} />
{/snippet}

<style>
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

	.is-bordered {
		.tl,
		.tr,
		.bl,
		.br {
			border: 1px solid var(--divider);
		}

		.tl {
			border-top-left-radius: 6px;
		}
		.tr {
			border-top-right-radius: 6px;
		}
		.bl {
			border-bottom-left-radius: 6px;
		}
		.br {
			border-bottom-right-radius: 6px;
		}
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
