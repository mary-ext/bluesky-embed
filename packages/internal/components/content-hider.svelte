<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LabelDefinition } from '../utils/labels';

	interface Props {
		warning: LabelDefinition | undefined;
		children: Snippet;
	}

	const { warning, children }: Props = $props();
</script>

{#if !warning}
	{@render children()}
{:else}
	<details class="content-hider">
		<summary class="gate">
			<svg class="icon" fill="none" viewBox="0 0 24 24">
				<path
					stroke="currentColor"
					stroke-linecap="square"
					stroke-width="2"
					d="M11 11h1v5m9-4a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
				/>
				<path
					fill="currentColor"
					stroke="currentColor"
					stroke-width=".5"
					d="M11.5 7.25h-.25v1.5h1.5v-1.5H11.5Z"
				/>
			</svg>

			<span class="label">{warning.name}</span>

			<span class="action"></span>
		</summary>

		{@render children()}
	</details>
{/if}

<style>
	.gate {
		display: flex;
		align-items: center;
		gap: 12px;
		cursor: pointer;
		border: 1px solid var(--divider);
		border-radius: 6px;
		padding: 0 12px;
		height: 44px;

		.content-hider[open] & {
			margin-bottom: 12px;
		}

		&:hover {
			border-color: var(--divider-hover);
		}
	}

	.icon {
		width: 18px;
		height: 18px;
		color: var(--text-secondary);
	}
	.label {
		flex-grow: 1;
		overflow: hidden;
		font-weight: 500;
		user-select: none;
		text-overflow: ellipsis;
	}

	.action {
		color: var(--text-link);
		font-weight: 500;
		font-size: calc(var(--font-size) * 0.8125);
		line-height: calc(var(--font-size) * 1.25);

		&::before {
			content: 'Show';
		}
		.content-hider[open] &::before {
			content: 'Hide';
		}
	}
</style>
