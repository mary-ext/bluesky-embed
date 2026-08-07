import preact from '@preact/preset-vite';
import { type PluginOption, defineConfig } from 'vite';

import { staticSvelte } from 'internal/build/static-svelte.js';

export default defineConfig({
	base: './',
	esbuild: {
		target: 'esnext',
	},
	plugins: [
		// oxlint-disable-next-line typescript/no-unsafe-type-assertion
		staticSvelte({
			cssHashPrefix: 'github:mary-ext/bluesky-post-embed/',
			root: __dirname,
		}) as PluginOption,
		preact(),
	],
});
