<script lang="ts">
	import { type ProfileCardData, renderProfileCard } from 'bluesky-profile-card-embed/core';
	import 'bluesky-profile-card-embed/style.css';

	interface Props {
		data: ProfileCardData;
	}

	let { data }: Props = $props();
</script>

<bluesky-profile-card actor={data.profile?.did}>{@html renderProfileCard(data)}</bluesky-profile-card>
