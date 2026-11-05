<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<div class="bluesky-embed">
	{@render children()}
</div>

<style>
	:global .bluesky-embed {
		position: relative;
		box-sizing: border-box;
		margin: 0 auto;
		border: 1px solid var(--divider);
		border-radius: 8px;
		background: var(--background-primary);
		min-width: 250px;
		max-width: 550px;
		overflow: hidden;
		color: var(--text-primary);
		font-weight: 400;
		font-size: calc(var(--font-size) * 0.875);
		line-height: calc(var(--font-size) * 1.25);
		font-family: var(--font-family);

		/* a pseudo-element is not a valid `:where()` argument, and `*` is already specificity 0 */
		*,
		*::before,
		*::after {
			box-sizing: border-box;
			margin: 0;
			padding: 0;
		}
		:where(a) {
			color: inherit;
			text-decoration: none;
		}

		:where(.bsky-icon) {
			flex-shrink: 0;
			width: 1em;
			height: 1em;
		}

		.bluesky-embed__message {
			margin: 0 auto;
			padding: 32px 16px;
			max-width: 380px;
			color: var(--text-secondary);
			text-align: center;
		}
	}
</style>
