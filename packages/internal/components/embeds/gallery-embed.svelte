<script lang="ts" module>
	const MIN_ASPECT_RATIO = 9 / 16;
	const MAX_ASPECT_RATIO = 16 / 9;

	// a landscape leading pair packs the strip toward the min height, a portrait pair toward the max.
	const MIN_HEIGHT = 200;
	const MAX_HEIGHT = 320;

	const clampAspectRatio = (ratio: number): number => {
		return Math.max(MIN_ASPECT_RATIO, Math.min(ratio, MAX_ASPECT_RATIO));
	};
</script>

<script lang="ts">
	import type { EmbedImage } from '../../utils/embeds';

	interface Props {
		images: EmbedImage[];
		blur?: boolean;
	}

	const { images, blur }: Props = $props();

	// unknown ratios get a square tile, letterboxed rather than cropped
	const tiles = images.map((image) => ({
		image,
		ratio: clampAspectRatio(image.ratio ?? 1),
		contained: image.ratio === undefined,
	}));

	// everything that depends on the images alone is resolved here,
	// the stylesheet then takes care of fitting the strip.
	const strip = (() => {
		const ratios = tiles.map(({ ratio }) => ratio);
		const avg = (ratios[0] + ratios[1]) / 2;
		const t = (avg - MIN_ASPECT_RATIO) / (MAX_ASPECT_RATIO - MIN_ASPECT_RATIO);

		return {
			base: MAX_HEIGHT + t * (MIN_HEIGHT - MAX_HEIGHT),
			count: ratios.length,
			last: ratios[ratios.length - 1],
			total: ratios.reduce((sum, ratio) => sum + ratio, 0),
			widest: Math.max(...ratios),
		};
	})();
</script>

<div class="gallery-embed">
	<div
		class="strip"
		style={`--base: ${strip.base}px; --count: ${strip.count}; --last: ${strip.last}; --total: ${strip.total}; --widest: ${strip.widest}`}
	>
		{#each tiles as { contained, image, ratio }}
			<div class="item" style={`--ratio: ${ratio}`}>
				<img
					loading="lazy"
					src={image.thumbnail}
					alt={image.alt}
					class={`image` + (contained ? ` is-contained` : ``) + (blur ? ` is-blurred` : ``)}
				/>
			</div>
		{/each}
	</div>
</div>

<style>
	.gallery-embed {
		/*
		 * the surrounding layout declares how far out its edges are via `--bleed-start` and `--bleed-end`, the
		 * strip extends out to them while keeping its images lined up with the content at rest.
		 */
		--start: var(--bleed-start, 0px);
		--end: var(--bleed-end, 0px);

		container-type: inline-size;
		margin-inline: calc(-1 * var(--start)) calc(-1 * var(--end));
	}

	.strip {
		--gap: 8px;
		/* sliver of the next image kept in view so the strip hints that there's more to scroll */
		--peek: 28px;
		/* shrink the row until the widest image fits whole alongside the peek */
		--height: min(var(--base), (100cqi - var(--start) - var(--gap) - var(--peek)) / var(--widest));
		--width: calc(var(--height) * var(--total) + var(--gap) * (var(--count) - 1));

		display: flex;
		gap: var(--gap);
		/*
		 * the end padding lets the last image snap to the leading edge. the overflow term is scaled up and
		 * clamped so it acts as a switch: a strip that fits never scrolls, and padding would only add dead space
		 * past the last image.
		 */
		padding-inline: var(--start)
			max(
				var(--end),
				min(
					(var(--start) + var(--width) + var(--end) - 100cqi) * 1000,
					100cqi - var(--start) - var(--height) * var(--last)
				)
			);
		overflow-x: auto;
		overflow-y: hidden;
		overscroll-behavior-x: contain;
		scroll-padding-inline-start: var(--start);
		scroll-snap-type: x mandatory;
		scrollbar-width: thin;
	}

	.item {
		flex: none;
		scroll-snap-align: start;
		border: 1px solid var(--divider);
		border-radius: 6px;
		width: calc(var(--height) * var(--ratio));
		height: var(--height);
		overflow: hidden;
	}

	.image {
		display: block;
		background: #000000;
		width: 100%;
		height: 100%;
		object-fit: cover;
		font-size: 0px;
	}
	.is-contained {
		object-fit: contain;
	}
	.is-blurred {
		scale: 125%;
		filter: blur(24px);
	}
</style>
