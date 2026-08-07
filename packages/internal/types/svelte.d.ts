declare module '*.svelte' {
	import type { Component } from 'svelte';

	// oxlint-disable-next-line typescript/no-explicit-any
	const component: Component<any>;
	export default component;
}
