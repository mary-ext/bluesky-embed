<script lang="ts">
	import type { AppBskyActorDefs } from '@atcute/client/lexicons';

	import { getProfileUrl } from '../utils/bsky-url';
	import { findLabel } from '../utils/labels';
	import { formatCompactNumber } from '../utils/number';
	import RichtextRawRenderer from './richtext-raw-renderer.svelte';

	interface Props {
		profile: AppBskyActorDefs.ProfileViewDetailed;
	}

	const { profile }: Props = $props();

	const url = getProfileUrl(profile.did);
	const isBlurred = findLabel(profile.labels, profile.did);
</script>

<div class="profile-card has-banner">
	<div class="banner-wrapper">
		{#if profile.banner}
			<img loading="lazy" src={profile.banner} alt="" class={`banner` + (isBlurred ? ` is-blurred` : ``)} />
		{/if}
	</div>

	<div class="contents">
		<div class="header">
			<a href={url} target="_blank" class="avatar-wrapper">
				{#if profile.avatar}
					<img
						loading="lazy"
						src={profile.avatar}
						alt=""
						class={`avatar` + (isBlurred ? ` is-blurred` : ``)}
					/>
				{/if}
			</a>

			<div class="actions">
				<a href={url} target="_blank" class="follow-button">
					<svg class="icon" fill="none" viewBox="0 0 24 24">
						<path
							stroke="currentColor"
							stroke-linecap="square"
							stroke-width="2"
							d="M12 4v8m0 0v8m0-8H4m8 0h8"
						/>
					</svg>
					<span>Follow</span>
				</a>

				<svg class="logo" fill="none" viewBox="0 0 320 286">
					<path
						fill="#0A7AFF"
						d="M69.364 19.146c36.687 27.806 76.147 84.186 90.636 114.439 14.489-30.253 53.948-86.633 90.636-114.439C277.107-.917 320-16.44 320 32.957c0 9.865-5.603 82.875-8.889 94.729-11.423 41.208-53.045 51.719-90.071 45.357 64.719 11.12 81.182 47.953 45.627 84.785-80 82.874-106.667-44.333-106.667-44.333s-26.667 127.207-106.667 44.333c-35.555-36.832-19.092-73.665 45.627-84.785-37.026 6.362-78.648-4.149-90.071-45.357C5.603 115.832 0 42.822 0 32.957 0-16.44 42.893-.917 69.364 19.147Z"
					/>
				</svg>
			</div>
		</div>

		<div class="name-wrapper">
			<p dir="auto" class="display-name">{profile.displayName?.trim() || profile.handle.slice(0, 64)}</p>
			<p class="handle">@{profile.handle}</p>
		</div>

		<div class="stats">
			<span class="stat-entry">
				<span class="stat-count">{formatCompactNumber(profile.followersCount || 0)}</span>
				<span> {profile.followersCount === 1 ? `Follower` : `Followers`}</span>
			</span>

			<span class="stat-entry">
				<span class="stat-count">{formatCompactNumber(profile.followsCount || 0)}</span>
				<span> Following</span>
			</span>
		</div>

		{#if profile.description?.trim()}
			<RichtextRawRenderer text={profile.description} />
		{/if}
	</div>
</div>

<style>
	.profile-card {
		display: flex;
		flex-direction: column;
	}

	.is-blurred {
		scale: 125%;
		filter: blur(4px);
	}

	.banner-wrapper {
		background: var(--background-secondary);
		aspect-ratio: 3 / 1;
		overflow: hidden;
	}
	.banner {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.contents {
		display: flex;
		position: relative;
		flex-direction: column;
		gap: 8px;
		padding: 12px 16px 16px;
	}
	.logo {
		width: 24px;
		height: 24px;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: end;
	}
	.actions {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.avatar-wrapper {
		display: block;
		flex-shrink: 0;
		outline: 2px solid var(--background-primary);
		border-radius: 9999px;
		background: var(--background-secondary);
		width: 90px;
		height: 90px;
		overflow: hidden;

		.has-banner & {
			margin-top: calc(-90px + 34px);
		}
	}
	.avatar {
		width: 100%;
		height: 100%;
		object-fit: cover;

		.avatar-wrapper:hover & {
			filter: brightness(0.85);

			&.is-blurred {
				filter: brightness(0.85) blur(4px);
			}
		}
	}

	.follow-button {
		display: flex;
		align-items: center;
		gap: 6px;
		border-radius: 9999px;
		background: var(--button);
		padding: 9px 12px;
		color: var(--button-text);
		font-weight: 600;
		font-size: calc(var(--font-size) * 0.8125);
		line-height: calc(var(--font-size) * 1);
		user-select: none;

		.icon {
			font-size: 16px;
		}

		&:hover {
			background: var(--button-hover);
		}
	}

	.display-name {
		font-weight: 700;
		font-size: calc(var(--font-size) * 1.25);
		line-height: calc(var(--font-size) * 1.75);
		overflow-wrap: break-word;
	}
	.handle {
		color: var(--text-secondary);
		overflow-wrap: break-word;
	}

	.stats {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;

		min-width: 0;
	}
	.stat-entry {
		color: var(--text-secondary);
	}
	.stat-count {
		color: var(--text-primary);
		font-weight: 700;
	}
</style>
