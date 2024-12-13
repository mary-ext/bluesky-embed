<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		children: Snippet;
	}

	let { label, children }: Props = $props();
</script>

<div class="field">
	<label class="input-wrapper">
		<span class="label">{label}</span>
		{@render children()}
	</label>
</div>

<style>
	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.input-wrapper {
		display: contents;
	}

	.label {
		color: #4b5563;
		font-weight: 600;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
</style>
