<script lang="ts" module>
	const HTTP_RE = /^https?:\/\//;
</script>

<script lang="ts">
	import { tokenize } from '@atcute/bluesky-richtext-parser';

	import { getHashtagUrl, getProfileUrl } from '../utils/bsky-url';

	interface Props {
		text: string;
	}

	const { text }: Props = $props();
</script>

<p class="bsky-rich-text">
	{#each tokenize(text) as token}
		{#if token.type === 'autolink'}
			<a target="_blank" href={token.url} rel="noopener nofollow" class="bsky-rich-text__link">
				{token.raw.replace(HTTP_RE, '')}
			</a>
		{:else if token.type === 'mention'}
			<a target="_blank" href={getProfileUrl(token.handle)} class="bsky-rich-text__mention">{token.raw}</a>
		{:else if token.type === 'topic'}
			<a target="_blank" href={getHashtagUrl(token.name)} class="bsky-rich-text__hashtag">{token.raw}</a>
		{:else}
			{token.raw}
		{/if}
	{/each}
</p>

<!-- shares the `bsky-rich-text` block with richtext-renderer.svelte, keep the two in sync -->
<style>
	:global .bluesky-embed {
		.bsky-rich-text {
			overflow: hidden;
			white-space: pre-wrap;
			overflow-wrap: break-word;

			&:empty {
				display: none;
			}
		}

		.bsky-rich-text__link,
		.bsky-rich-text__mention,
		.bsky-rich-text__hashtag {
			color: var(--text-link);

			&:hover {
				text-decoration: underline;
			}
		}
	}
</style>
