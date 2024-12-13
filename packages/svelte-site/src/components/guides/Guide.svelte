<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children: Snippet<[]>;
	}

	let { title, children }: Props = $props();
</script>

<div class="guide">
	<h4 class="guide-header">{title}</h4>

	{@render children()}
</div>

<style>
	.guide {
		margin: 36px 0 0 0;
		border-top: 1px solid #d1d5db;
	}
	.guide-header {
		margin: 36px 0 16px 0;
	}
</style>
