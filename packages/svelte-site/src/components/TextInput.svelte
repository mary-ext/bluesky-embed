<script lang="ts">
	interface Props {
		type?: 'text' | 'url';
		value?: string;
		placeholder?: string;
	}

	let { type, value = $bindable(), placeholder }: Props = $props();
</script>

<input {type} {placeholder} bind:value class="text-input" />

<style>
	.text-input {
		outline: 2px none #2563eb;
		outline-offset: -1px;
		border: 1px solid #9ca3af;
		border-radius: 4px;
		padding: 8px 12px;
		font-size: 0.875rem;
		line-height: 1.25rem;

		&::placeholder {
			color: #9ca3af;
		}
		&:focus {
			outline-style: solid;
		}
	}
</style>
