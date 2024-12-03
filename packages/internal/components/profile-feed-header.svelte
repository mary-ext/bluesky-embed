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

	<a target="_blank" href={getProfileUrl(profile.did)} class="follow-button">Follow on Bluesky</a>
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

	.follow-button {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		margin: 0 -4px 0 0;
		border-radius: 6px;
		background: var(--button);
		padding: 0 16px;
		height: 32px;
		color: var(--button-text);
		font-weight: 500;
		line-height: 1;

		&:hover {
			background: var(--button-hover);
		}

		@container (max-width: 360px) {
			display: none;
		}
	}
</style>
