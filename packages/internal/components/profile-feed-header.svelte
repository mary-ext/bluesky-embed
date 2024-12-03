<script lang="ts">
	import type { AppBskyActorDefs } from '@atcute/client/lexicons';

	import { getProfileUrl } from '../utils/bsky-url';

	interface Props {
		profile: AppBskyActorDefs.ProfileViewDetailed;
	}

	const { profile }: Props = $props();
</script>

<div class="profile-feed-header">
	<a target="_blank" href={getProfileUrl(profile.did)} class="title">Posts from @{profile.handle}</a>

	<svg class="logo" fill="none" viewBox="0 0 320 286">
		<path
			fill="#0A7AFF"
			d="M69.364 19.146c36.687 27.806 76.147 84.186 90.636 114.439 14.489-30.253 53.948-86.633 90.636-114.439C277.107-.917 320-16.44 320 32.957c0 9.865-5.603 82.875-8.889 94.729-11.423 41.208-53.045 51.719-90.071 45.357 64.719 11.12 81.182 47.953 45.627 84.785-80 82.874-106.667-44.333-106.667-44.333s-26.667 127.207-106.667 44.333c-35.555-36.832-19.092-73.665 45.627-84.785-37.026 6.362-78.648-4.149-90.071-45.357C5.603 115.832 0 42.822 0 32.957 0-16.44 42.893-.917 69.364 19.147Z"
		/>
	</svg>
</div>

<style>
	.profile-feed-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		container-type: inline-size;
		border-bottom: 1px solid var(--divider);
		padding: 12px 16px;
	}

	.title {
		padding: 4px 0;
		min-width: 0;
		overflow: hidden;
		font-weight: 600;
		font-size: calc(var(--font-size) * 1);
		line-height: calc(var(--font-size) * 1.5);
		text-overflow: ellipsis;
		white-space: nowrap;

		&:hover {
			text-decoration: underline;
		}
	}

	.logo {
		width: 24px;
		height: 24px;
	}
</style>
