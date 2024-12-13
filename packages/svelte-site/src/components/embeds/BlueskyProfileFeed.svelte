<script lang="ts">
	import { type ProfileFeedData, renderProfileFeed } from 'bluesky-profile-feed-embed/core';
	import 'bluesky-profile-feed-embed/style.css';

	interface Props {
		data: ProfileFeedData;
	}

	let { data }: Props = $props();
</script>

<bluesky-profile-feed actor={data.profile?.did}>{@html renderProfileFeed(data)}</bluesky-profile-feed>
