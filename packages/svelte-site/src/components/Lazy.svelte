<script lang="ts" module>
	import type { Snippet, Component } from 'svelte';

	type SvelteComponentModule<C extends Component = Component> = { default: C };
	type LoaderFunction<C extends Component = Component> = () => Promise<SvelteComponentModule<C>>;

	const map = new WeakMap<LoaderFunction, Promise<Component>>();
	const get_promise = <C extends Component>(fn: LoaderFunction<C>): Promise<C> => {
		let promise = map.get(fn) satisfies Promise<Component> | undefined;
		if (promise === undefined) {
			map.set(fn, (promise = fn().then((mod) => mod.default)));
		}

		return promise as Promise<C>;
	};
</script>

<script lang="ts" generics="C extends Component<any>">
	interface Props {
		loader: LoaderFunction<C>;
		children: Snippet<[component: C]>;
		fallback: Snippet<[]>;
		boundary: Snippet<[error: unknown]>;
	}

	let { loader, children, fallback, boundary }: Props = $props();

	const promise = $derived(get_promise(loader));
</script>

{#await promise}
	{@render fallback()}
{:then component}
	{@render children(component)}
{:catch err}
	{@render boundary(err)}
{/await}
