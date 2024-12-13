<script lang="ts" module>
	const PostDisplay = () => import('./components/display/PostDisplay.svelte');
	const ProfileCardDisplay = () => import('./components/display/ProfileCardDisplay.svelte');
	const ProfileFeedDisplay = () => import('./components/display/ProfileFeedDisplay.svelte');
</script>

<script lang="ts">
	import { extract_url } from './lib/matcher';

	import Banner from './components/Banner.svelte';
	import CircularSpinner from './components/CircularSpinner.svelte';
	import Field from './components/Field.svelte';
	import Lazy from './components/Lazy.svelte';
	import TextInput from './components/TextInput.svelte';

	const DEFAULT_URL = 'https://bsky.app/profile/did:plc:ragtjsm2j2vknwkz3zp4oxrd/post/3kj2umze7zj2n';
	// const DEFAULT_URL = 'https://bsky.app/profile/did:plc:ragtjsm2j2vknwkz3zp4oxrd';

	let url = $state('');
	let profile_type = $state<'card' | 'feed'>('feed');

	const matched = $derived(extract_url(url || DEFAULT_URL));
</script>

<div class="app">
	<h1 class="header">
		<code>&lt;bluesky-embed&gt;</code>
	</h1>

	<Field label="Bluesky post or profile URL">
		<TextInput type="url" bind:value={url} placeholder={DEFAULT_URL} />
	</Field>

	{#if matched && matched.type === 'profile'}
		<fieldset class="choices">
			<label class="choice">
				<input type="radio" name="profile-type" value="feed" bind:group={profile_type} />
				<span>Profile feed</span>
			</label>

			<label class="choice">
				<input type="radio" name="profile-type" value="card" bind:group={profile_type} />
				<span>Profile card</span>
			</label>
		</fieldset>
	{/if}

	<main class="main">
		{#if !matched}
			<Banner type="alert">Invalid URL, did you type it correctly?</Banner>
		{:else if matched.type === 'post'}
			<Lazy loader={PostDisplay} fallback={LazyFallback} boundary={LazyBoundary}>
				{#snippet children(Component)}
					<Component {matched} />
				{/snippet}
			</Lazy>
		{:else if matched.type === 'profile'}
			<Lazy
				loader={profile_type === 'card' ? ProfileCardDisplay : ProfileFeedDisplay}
				fallback={LazyFallback}
				boundary={LazyBoundary}
			>
				{#snippet children(Component)}
					<Component {matched} />
				{/snippet}
			</Lazy>
		{/if}
	</main>

	<footer class="footer">
		<span>
			made with ❤️ by <a href="https://bsky.app/profile/did:plc:ia76kvnndjutgedggx2ibrem">@mary.my.id</a>
		</span>
		<span aria-hidden="true"> · </span>
		<span>
			<a href="https://github.com/mary-ext/bluesky-embed">source code</a>
		</span>
		<span aria-hidden="true"> · </span>
		<span>MIT License</span>
	</footer>
</div>

{#snippet LazyFallback()}
	<CircularSpinner />
{/snippet}

{#snippet LazyBoundary(err: unknown)}
	<Banner type="alert">
		{'' + err}
	</Banner>
{/snippet}

<style>
	.app {
		margin: 0 auto;
		padding: 36px 16px;
		width: 100%;
		max-width: calc(550px + (16 * 2px));
	}

	.header {
		margin: 24px 0;
	}

	.main {
		margin: 36px 0;
	}

	.choices {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin: 16px 0 36px 0;
		border: 0;
		padding: 0;
	}
	.choice {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.875rem;
		line-height: 1.25rem;

		input {
			appearance: none;
			outline: 2px none #2563eb;
			outline-offset: 2px;
			border: 1px solid #9ca3af;
			border-radius: 8px;
			width: 16px;
			height: 16px;

			&:checked {
				border: 0;
				background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
				background-color: #2563eb;
			}
			&:focus {
				outline-style: solid;
			}
		}
	}

	.footer {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 36px 0 0 0;
		border-top: 1px solid #d1d5db;
		padding: 36px 0 0 0;
		color: #4b5563;
		font-size: 0.875rem;
		line-height: 1.25rem;

		a {
			color: #2563eb;
		}
	}
</style>
