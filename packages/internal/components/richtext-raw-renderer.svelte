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

<p class="rich-text is-small">
	{#each tokenize(text) as token}
		{#if token.type === 'autolink'}
			<a target="_blank" href={token.url} rel="noopener nofollow" class="link">
				{token.raw.replace(HTTP_RE, '')}
			</a>
		{:else if token.type === 'mention'}
			<a target="_blank" href={getProfileUrl(token.handle)} class="mention">{token.raw}</a>
		{:else if token.type === 'topic'}
			<a target="_blank" href={getHashtagUrl(token.name)} class="hashtag">{token.raw}</a>
		{:else}
			{token.raw}
		{/if}
	{/each}
</p>

<style>
	.rich-text {
		overflow: hidden;
		white-space: pre-wrap;
		overflow-wrap: break-word;

		&:empty {
			display: none;
		}
	}

	.link,
	.mention,
	.hashtag {
		color: var(--text-link);

		&:hover {
			text-decoration: underline;
		}
	}
</style>
