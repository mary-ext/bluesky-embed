<script lang="ts">
	import { onDestroy } from 'svelte';

	import type { AppBskyFeedDefs, AppBskyFeedPost } from '@atcute/client/lexicons';
	import { fetchPost as fetch_post } from 'bluesky-post-embed/core';

	import { getPostUrl } from 'internal/utils/bsky-url.ts';
	import { formatLongDate } from 'internal/utils/date.ts';
	import { parseAtUri } from 'internal/utils/syntax/at-url.ts';

	import { escape_html } from '../../lib/html';
	import type { ExtractedPostInfo } from '../../lib/matcher';

	import Banner from '../Banner.svelte';
	import CircularSpinner from '../CircularSpinner.svelte';
	import CodeBlock from '../CodeBlock.svelte';
	import BlueskyPost from '../embeds/BlueskyPost.svelte';
	import Guide from '../guides/Guide.svelte';
	import GuideInstructions from '../guides/GuideInstructions.svelte';

	interface Props {
		matched: ExtractedPostInfo;
	}

	let { matched }: Props = $props();

	let controller: AbortController | undefined;
	const promise = $derived.by(() => {
		controller?.abort();
		controller = new AbortController();

		const signal = controller.signal;
		const uri = `at://${matched.author}/app.bsky.feed.post/${matched.rkey}`;

		return fetch_post({ uri, signal });
	});

	onDestroy(() => {
		controller?.abort();
	});

	const JSDELIVR_URL = `https://cdn.jsdelivr.net/npm/bluesky-post-embed@^1.0.0`;
	const get_prerequisite_markup = () => {
		return `<!-- Core web component and styling -->
<script type="module" src="${JSDELIVR_URL}/+esm"></${'script'}>
<link rel="stylesheet" href="${JSDELIVR_URL}/dist/core.min.css">

<!-- Built-in themes -->
<link rel="stylesheet" href="${JSDELIVR_URL}/themes/light.min.css" media="(prefers-color-scheme: light)">
<link rel="stylesheet" href="${JSDELIVR_URL}/themes/dim.min.css" media="(prefers-color-scheme: dark)">

<!-- Fallback/placeholder elements if JS script is taking a while to load or is failing -->
<style>
  .bluesky-post-fallback {
    margin: 16px 0;
    border-left: 3px solid var(--divider);
    padding: 4px 8px;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
  .bluesky-post-fallback p {
    margin: 0 0 8px 0;
  }
</${'style'}>
`;
	};

	const get_markup = (post: AppBskyFeedDefs.PostView) => {
		const author = post.author;
		const record = post.record as AppBskyFeedPost.Record;

		return `<bluesky-post src="${escape_html(post.uri)}">
  <blockquote class="bluesky-post-fallback">
    <p dir="auto">${escape_html(record.text)}</p>
    — ${author.displayName?.trim() ? `${escape_html(author.displayName)} (@${escape_html(author.handle)})` : `@${escape_html(author.handle)}`}
    <a href="${escape_html(getPostUrl(author.did, parseAtUri(post.uri).rkey))}">${formatLongDate(post.indexedAt)}</a>
  </blockquote>
</bluesky-post>
`;
	};
</script>

{#await promise}
	<CircularSpinner />
{:then data}
	<BlueskyPost {data} />

	{#if data.thread}
		<Guide title="How do I embed this to my website?">
			<Banner type="inform">
				Doing server-side rendering? Check out examples for
				<a href="https://github.com/mary-ext/bluesky-embed-astro">Astro</a> and
				<a href="https://github.com/mary-ext/bluesky-embed-sveltekit">SvelteKit</a>.
			</Banner>

			<GuideInstructions>
				<li>
					<p>
						Insert the following scripts and stylesheets to the <code>&lt;head&gt;</code> of your website.
					</p>
					<CodeBlock code={get_prerequisite_markup()} />
				</li>

				<li>
					<p>Insert the following markup in wherever you want the post to be.</p>
					<CodeBlock code={get_markup(data.thread.post)} />
				</li>
			</GuideInstructions>
		</Guide>
	{/if}
{:catch err}
	<Banner type="alert">
		{'' + err}
	</Banner>
{/await}
