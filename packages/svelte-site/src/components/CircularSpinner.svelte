<script lang="ts">
	interface Props {}

	let {}: Props = $props();
</script>

<svg viewBox="0 0 32 32" class="circular-spinner">
	<circle cx="16" cy="16" fill="none" r="14" stroke-width="4" class="background" />
	<circle
		cx="16"
		cy="16"
		fill="none"
		r="14"
		stroke-width="4"
		stroke-dasharray="80px"
		stroke-dashoffset="60px"
		class="accented"
	/>
</svg>

<style>
	.circular-spinner {
		display: block;
		animation: spin 1s linear infinite;
		margin: 0 auto;
		width: 24px;
		height: 24px;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.accented {
		stroke: #2563eb;
	}
	.background {
		stroke: #2563eb;
		opacity: 20%;
	}
</style>
