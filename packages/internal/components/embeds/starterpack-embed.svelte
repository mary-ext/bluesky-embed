<script lang="ts">
	import type { AppBskyGraphDefs, AppBskyGraphStarterpack } from '@atcute/client/lexicons';

	import { getStarterpackImgUrl, getStarterpackUrl } from '../../utils/bsky-url';
	import { parseAtUri } from '../../utils/syntax/at-url';

	interface Props {
		embed: AppBskyGraphDefs.StarterPackViewBasic;
		large?: boolean;
	}

	const { embed: pack, large = false }: Props = $props();

	const record = pack.record as AppBskyGraphStarterpack.Record;

	const creator = pack.creator;
	const creatorDid = creator.did;

	const rkey = parseAtUri(pack.uri).rkey;
	const packUrl = getStarterpackUrl(creatorDid, rkey);
</script>

<a target="_blank" href={packUrl} class="starterpack-embed">
	{#if large}
		{@const imageUrl = getStarterpackImgUrl(creatorDid, rkey)}

		<img loading="lazy" src={imageUrl} alt="" class="banner" />
	{/if}

	<div class="meta">
		<div class="main">
			<svg fill="none" viewBox="0 0 24 24" class="avatar">
				<defs>
					<linearGradient id="a" x1="0" x2="100%" y1="0" y2="0" gradientTransform="rotate(45)">
						<stop offset="0" stop-color="#0A7AFF" />
						<stop offset="1" stop-color="#59B9FF" />
					</linearGradient>
				</defs>
				<path
					fill="url(#a)"
					fill-rule="evenodd"
					d="M11.26 5.227 5.02 6.899c-.734.197-1.17.95-.973 1.685l1.672 6.24c.197.734.951 1.17 1.685.973l6.24-1.672a1.376 1.376 0 0 0 .973-1.685L12.945 6.2a1.375 1.375 0 0 0-1.685-.973Zm-6.566.459a2.632 2.632 0 0 0-1.86 3.223l1.672 6.24a2.632 2.632 0 0 0 3.223 1.861l6.24-1.672a2.631 2.631 0 0 0 1.861-3.223l-1.672-6.24a2.632 2.632 0 0 0-3.223-1.861l-6.24 1.672Z"
					clip-rule="evenodd"
				/>
				<path
					fill="url(#a)"
					fill-rule="evenodd"
					d="M15.138 18.411a4.606 4.606 0 1 0 0-9.211 4.606 4.606 0 0 0 0 9.211Zm0 1.257a5.862 5.862 0 1 0 0-11.724 5.862 5.862 0 0 0 0 11.724Z"
					clip-rule="evenodd"
				/>
			</svg>

			<div class="info">
				<p class="name">{record.name}</p>
				<p class="creator">Starter pack by @{creator.handle}</p>
			</div>
		</div>

		<p class="description">{record.description}</p>
	</div>
</a>

<style>
	.starterpack-embed {
		display: block;
		border: 1px solid var(--divider);
		border-radius: 6px;
		overflow: hidden;

		&:hover {
			border-color: var(--divider-hover);
		}
	}

	.banner {
		display: block;
		aspect-ratio: 1.91;
		width: 100%;
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 12px;
	}

	.main {
		display: flex;
		gap: 12px;
	}

	.avatar {
		margin: 2px;
		width: 36px;
		height: 36px;
	}

	.name {
		font-weight: 700;
	}

	.creator {
		color: var(--text-secondary);
		font-size: calc(var(--font-size) * 0.8125);
	}

	.description {
		display: -webkit-box;
		overflow: hidden;
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
</style>
