import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';

import { staticSvelte } from 'internal/build/static-svelte.js';

export default defineConfig({
	base: './',
	plugins: [
		staticSvelte({
			cssHashPrefix: 'github:mary-ext/bluesky-post-embed/',
			root: import.meta.dirname,
		}),
		preact(),
	],
});
