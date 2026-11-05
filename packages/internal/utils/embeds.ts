import type { AppBskyEmbedDefs, MediaEmbed } from '@atcute/bluesky';

/** an image from an images or gallery embed. */
export interface EmbedImage {
	alt: string;
	/** width divided by height, `undefined` when the dimensions are unknown */
	ratio: number | undefined;
	thumbnail: string;
}

const getRatio = (aspectRatio: AppBskyEmbedDefs.AspectRatio | undefined): number | undefined => {
	if (aspectRatio && aspectRatio.width > 0 && aspectRatio.height > 0) {
		return aspectRatio.width / aspectRatio.height;
	}

	return undefined;
};

/**
 * lists the images of an images or gallery embed.
 *
 * @param embed media embed view
 * @returns images in their original order, empty if the embed doesn't carry images
 */
export const getEmbedImages = (embed: MediaEmbed | undefined): EmbedImage[] => {
	switch (embed?.$type) {
		case 'app.bsky.embed.gallery#view': {
			return embed.items.map((item) => ({
				alt: item.alt,
				ratio: getRatio(item.aspectRatio),
				thumbnail: item.thumbnail,
			}));
		}
		case 'app.bsky.embed.images#view': {
			return embed.images.map((image) => ({
				alt: image.alt,
				ratio: getRatio(image.aspectRatio),
				thumbnail: image.thumb,
			}));
		}
	}

	return [];
};
