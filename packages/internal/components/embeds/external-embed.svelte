<script lang="ts" module>
	const safeParseUrl = (str: string): URL | null => {
		let url: URL | null | undefined;
		if ('parse' in URL) {
			url = URL.parse(str);
		} else {
			try {
				// @ts-expect-error: `'parse' in URL` is giving truthy
				url = new URL(str);
			} catch {}
		}

		if (url && (url.protocol === 'https:' || url.protocol === 'http:')) {
			return url;
		}

		return null;
	};
</script>

<script lang="ts">
	import type { AppBskyEmbedExternal } from '@atcute/client/lexicons';

	interface Props {
		embed: AppBskyEmbedExternal.View;
	}

	const { embed }: Props = $props();

	const external = embed.external;

	const domain = safeParseUrl(external.uri)?.host;
</script>

<a target="_blank" href={domain && external.uri} rel="noopener noreferrer nofollow" class="external-embed">
	{#if external.thumb}
		<img loading="lazy" src={external.thumb} alt="" class="thumbnail" />
	{/if}

	<div class="meta">
		<p class="title">{external.title}</p>
		<p class="description">{external.description}</p>

		{#if domain}
			<div class="domain">
				<!-- earth -->
				<svg class="icon" fill="none" viewBox="0 0 24 24">
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-width="2"
						d="m4.172 8.07 3.94 2.957.977-1.941 3.887-.978 1.15-4.6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-6.078 4.865.973-1.946-2.869-1.928-1.89-.12-1.08 1.075 1.947 2.919h2.919Z"
					/>
				</svg>

				<span class="domain-name">{domain}</span>
			</div>
		{/if}
	</div>
</a>

<style>
	.external-embed {
		display: block;
		border: 1px solid var(--divider);
		border-radius: 6px;
		overflow: hidden;

		&:hover {
			border-color: var(--divider-hover);
		}
	}

	.thumbnail {
		display: block;
		background: #000000;
		aspect-ratio: 1.91;
		width: 100%;
	}

	.meta {
		padding: 12px;
	}

	.title {
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
	.description {
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

	.domain {
		display: flex;
		align-items: center;
		gap: 6px;
		margin: 6px 0 0 0;
		color: var(--text-secondary);
		font-weight: 500;
		font-size: calc(var(--font-size) * 0.75);
	}
</style>
