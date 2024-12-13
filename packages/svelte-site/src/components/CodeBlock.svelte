<script lang="ts">
	interface Props {
		code: string;
	}

	let { code }: Props = $props();
</script>

<div class="code-block">
	<pre><code>{code}</code></pre>

	<div class="actions">
		<button
			title="Copy"
			aria-label="Copy"
			class="action-button"
			onclick={() => {
				navigator.clipboard.writeText(code).catch(() => alert(`Failed to copy to clipboard`));
			}}
		>
			<svg class="icon" fill="none" viewBox="0 0 24 24">
				<path
					stroke="currentColor"
					stroke-linecap="square"
					stroke-width="2"
					d="M15 5h4v16H5V5h4m0-2h6v4H9V3Z"
				/>
			</svg>
		</button>
	</div>
</div>

<style>
	.code-block {
		display: flex;
		gap: 12px;
		border: 1px solid #d1d5db;
		border-radius: 4px;
		background: #f9fafb;
		padding: 12px;
		overflow: hidden;
		overflow-x: auto;

		pre {
			flex-grow: 1;
			margin: 0;
			font-size: 0.75rem;
			line-height: 1.25rem;
		}
	}

	.actions {
		position: sticky;
		top: 0;
		right: 0;
	}
	.action-button {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		box-shadow:
			0 1px 3px 0 rgb(0 0 0 / 0.1),
			0 1px 2px -1px rgb(0 0 0 / 0.1);
		border: 1px solid #d1d5db;
		border-radius: 4px;
		background: #ffffff;
		padding: 0;
		width: 32px;
		height: 32px;
		color: #4b5563;

		@media (pointer: fine) {
			opacity: 0;
			transition: 75ms ease-in;

			.code-block:hover &,
			.code-block:focus-within & {
				opacity: 1;
			}

			&:hover {
				border-color: #9ca3af;
				background: #e5e7eb;
				color: #1f2937;
			}
		}

		&:active {
			border-color: #9ca3af;
			background: #e5e7eb;
			color: #1f2937;
		}
	}

	.icon {
		width: 16px;
		height: 16px;
	}
</style>
