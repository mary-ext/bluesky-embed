<script lang="ts">
	import { onDestroy } from 'svelte';

	import type { AppBskyActorDefs } from '@atcute/client/lexicons';
	import { fetchProfileFeed as fetch_profile_feed } from 'bluesky-profile-feed-embed/core';

	import { escape_html } from '../../lib/html';
	import type { ExtractedProfileInfo } from '../../lib/matcher';

	import Banner from '../Banner.svelte';
	import CircularSpinner from '../CircularSpinner.svelte';
	import CodeBlock from '../CodeBlock.svelte';
	import BlueskyProfileFeed from '../embeds/BlueskyProfileFeed.svelte';
	import Guide from '../guides/Guide.svelte';
	import GuideInstructions from '../guides/GuideInstructions.svelte';

	interface Props {
		matched: ExtractedProfileInfo;
	}

	let { matched }: Props = $props();

	let controller: AbortController | undefined;
	const promise = $derived.by(() => {
		controller?.abort();
		controller = new AbortController();

		const signal = controller.signal;
		const actor = matched.actor;

		return fetch_profile_feed({ actor, signal });
	});

	onDestroy(() => {
		controller?.abort();
	});

	const get_prerequisite_markup = () => {
		const JSDELIVR_URL = `https://cdn.jsdelivr.net/npm/bluesky-profile-feed-embed@^1.0.0`;

		return `<!-- Core web component and styling -->
<script type="module" src="${JSDELIVR_URL}/+esm"></${'script'}>
<link rel="stylesheet" href="${JSDELIVR_URL}/dist/core.min.css">

<!-- Built-in themes -->
<link rel="stylesheet" href="${JSDELIVR_URL}/themes/light.min.css" media="(prefers-color-scheme: light)">
<link rel="stylesheet" href="${JSDELIVR_URL}/themes/dim.min.css" media="(prefers-color-scheme: dark)">
`;
	};

	const get_markup = (profile: AppBskyActorDefs.ProfileViewDetailed) => {
		const url = `https://bsky.app/profile/${profile.did}`;

		return `<bluesky-profile-feed actor="${escape_html(profile.did)}" include-pins>
  <a target="_blank" href="${escape_html(url)}" class="bluesky-profile-feed-fallback">
    ${
			profile.displayName?.trim()
				? `Posts by ${escape_html(profile.displayName)} (@${escape_html(profile.handle)})`
				: `Posts by @${escape_html(profile.handle)}`
		}
  </a>
</bluesky-profile-feed>
`;
	};
</script>

{#await promise}
	<CircularSpinner />
{:then data}
	<BlueskyProfileFeed {data} />

	{#if data.profile}
		<Guide title="How do I embed this to my website?">
			<GuideInstructions>
				<li>
					<p>
						Insert the following scripts and stylesheets to the <code>&lt;head&gt;</code> of your website.
					</p>
					<CodeBlock code={get_prerequisite_markup()} />
				</li>

				<li>
					<p>Insert the following markup in wherever you want the profile feed to be.</p>
					<CodeBlock code={get_markup(data.profile)} />
				</li>
			</GuideInstructions>
		</Guide>
	{/if}
{:catch err}
	<Banner type="alert">
		{'' + err}
	</Banner>
{/await}
