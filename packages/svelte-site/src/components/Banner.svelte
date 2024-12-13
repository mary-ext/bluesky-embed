<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		type: 'alert' | 'inform';
		children: Snippet<[]>;
	}

	let { type, children }: Props = $props();
</script>

<div class="banner" class:type-alert={type === 'alert'} class:type-inform={type === 'inform'}>
	{@render children()}
</div>

<style>
	.banner {
		border: 1px solid;
		border-radius: 4px;
		padding: 10px 12px;
		font-weight: 500;
		font-size: 0.875rem;
		line-height: 1.25rem;

		:global(a) {
			color: inherit;
			font-weight: 600;
		}
	}

	.type-alert {
		border-color: #fca5a5;
		background: #fee2e2;
		color: #991b1b;
	}

	.type-inform {
		border-color: #bfdbfe;
		background: #dbeafe;
		color: #1e40af;
	}
</style>
