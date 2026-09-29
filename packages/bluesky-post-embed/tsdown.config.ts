import { type UserConfig, defineConfig } from 'tsdown';

import { staticSvelte } from 'internal/build/static-svelte.ts';

const shared = {
	platform: 'neutral',
	target: 'esnext',
	minify: false,
	tsconfig: 'tsconfig.lib.json',
	dts: { eager: true },
	plugins: [
		staticSvelte({
			cssHashPrefix: 'github:mary-ext/bluesky-post-embed/',
			root: import.meta.dirname,
		}),
	],
} satisfies UserConfig;

export default defineConfig([
	{
		...shared,
		entry: { core: 'lib/core.ts' },
		css: {
			fileName: 'core.css',
			target: false,
		},
	},
	{
		...shared,
		entry: { wc: 'lib/wc.ts' },
		deps: { neverBundle: ['./core.js'] },
	},
]);
