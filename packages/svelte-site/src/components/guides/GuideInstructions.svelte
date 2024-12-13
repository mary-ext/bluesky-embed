<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet<[]>;
	}

	let { children }: Props = $props();
</script>

<ol class="guide-instructions">
	{@render children()}
</ol>

<style>
	.guide-instructions {
		margin: 24px 0 0 0;
		padding: 0 0 0 22px;
		font-size: 0.875rem;
		line-height: 1.25rem;

		:global(li + li) {
			margin: 24px 0 0 0;
		}
	}
</style>
