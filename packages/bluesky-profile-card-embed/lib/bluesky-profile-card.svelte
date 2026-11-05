<script lang="ts">
	import EmbedFrame from 'internal/components/embed-frame.svelte';
	import ProfileCard from 'internal/components/profile-card.svelte';
	import type { ProfileCardData } from 'internal/types/profile-card.js';
	import { NO_UNAUTHENTICATED_LABEL } from 'internal/utils/constants.js';

	const { profile, allowUnauthenticated }: ProfileCardData = $props();

	const isPwiForbidden =
		!allowUnauthenticated && profile?.labels?.some((label) => label.val === NO_UNAUTHENTICATED_LABEL);
</script>

{#if profile === null}
	{@render Message(`The profile can't be found, it may have been deleted.`)}
{:else if isPwiForbidden}
	{@render Message(`The user has requested for their profile to not be displayed on external sites.`)}
{:else}
	<EmbedFrame>
		<ProfileCard {profile} />
	</EmbedFrame>
{/if}

{#snippet Message(msg: string)}
	<EmbedFrame>
		<div class="bluesky-embed__message">{msg}</div>
	</EmbedFrame>
{/snippet}
