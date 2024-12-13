<script lang="ts">
	import { type PostData, renderPost } from 'bluesky-post-embed/core';
	import 'bluesky-post-embed/style.css';

	interface Props {
		data: PostData;
	}

	let { data }: Props = $props();
</script>

<bluesky-post src={data.thread?.post.uri}>{@html renderPost(data)}</bluesky-post>
