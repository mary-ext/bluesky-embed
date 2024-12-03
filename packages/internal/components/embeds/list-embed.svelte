<script lang="ts" module>
	const getPurpose = (purpose: AppBskyGraphDefs.ListPurpose) => {
		switch (purpose) {
			case 'app.bsky.graph.defs#curatelist':
				return `User list`;
			case 'app.bsky.graph.defs#modlist':
				return `Moderation list`;
		}

		return `Unknown list`;
	};
</script>

<script lang="ts">
	import type { AppBskyGraphDefs } from '@atcute/client/lexicons';

	import { getFeedUrl } from '../../utils/bsky-url';
	import { parseAtUri } from '../../utils/syntax/at-url';

	interface Props {
		embed: AppBskyGraphDefs.ListView;
	}

	const { embed: list }: Props = $props();

	const creator = list.creator;

	const listUrl = getFeedUrl(creator.did, parseAtUri(list.uri).rkey);
</script>

<a target="_blank" href={listUrl} class="list-embed">
	<div class="main">
		<div class="avatar-wrapper">
			{#if list.avatar}
				<img loading="lazy" src={list.avatar} alt="" class="avatar" />
			{:else}
				<svg viewBox="0 0 32 32" class="avatar">
					<path fill="#0070FF" d="M0 0h32v32H0z" />
					<path
						fill="#fff"
						d="M22.153 22.354a9.328 9.328 0 0 0 3.837-.491 3.076 3.076 0 0 0-4.802-2.79m.965 3.281a6.128 6.128 0 0 0-.965-3.28Zm-11.342-3.28a3.077 3.077 0 0 0-4.801 2.79 9.21 9.21 0 0 0 3.835.49m.966-3.28a6.127 6.127 0 0 0-.966 3.28Zm8.265-8.997a3.076 3.076 0 1 1-6.153 0 3.076 3.076 0 0 1 6.153 0Zm6.154 3.077a2.307 2.307 0 1 1-4.615 0 2.307 2.307 0 0 1 4.615 0Zm-13.847 0a2.307 2.307 0 1 1-4.614 0 2.307 2.307 0 0 1 4.614 0Z"
					/>
					<path fill="#fff" d="M22 22c0 3.314-2.686 3.5-6 3.5s-6-.186-6-3.5a6 6 0 0 1 12 0Z" />
				</svg>
			{/if}
		</div>

		<div class="info">
			<p class="name">{list.name}</p>
			<p class="creator">{getPurpose(list.purpose)} by @{creator.handle}</p>
		</div>
	</div>

	<p class="description">{list.description}</p>
</a>

<style>
	.list-embed {
		display: flex;
		flex-direction: column;
		gap: 12px;
		border: 1px solid var(--divider);
		border-radius: 6px;
		padding: 12px;

		&:hover {
			border-color: var(--divider-hover);
		}
	}

	.main {
		display: flex;
		gap: 12px;
	}

	.avatar-wrapper {
		margin: 2px 0 0 0;
		border-radius: 6px;
		background: var(--background-secondary);
		width: 36px;
		height: 36px;
		overflow: hidden;
	}
	.avatar {
		width: 100%;
		height: 100%;
		object-fit: cover;
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
