import { type UserConfig, defineConfig } from 'tsdown';

import { staticSvelte } from 'internal/build/static-svelte.ts';

const RUNTIME_DEPS = ['@atcute/client', '@atcute/bluesky-richtext-parser'];

const LEXICON_SUBPATHS = /^@atcute\/(bluesky|client)\/lexicons$/;

const shared = {
	platform: 'neutral',
	target: 'esnext',
	minify: false,
	tsconfig: 'tsconfig.build.json',
	dts: { eager: true },
	plugins: [
		staticSvelte({
			cssHashPrefix: 'github:mary-ext/bluesky-profile-card-embed/',
			root: import.meta.dirname,
		}),
	],
} satisfies UserConfig;

export default defineConfig([
	{
		...shared,
		entry: { core: 'lib/core.ts' },
		deps: {
			neverBundle: RUNTIME_DEPS,
			alwaysBundle: [LEXICON_SUBPATHS],
			dts: { neverBundle: [LEXICON_SUBPATHS] },
		},
		css: {
			fileName: 'core.css',
			target: false,
		},
	},
	{
		...shared,
		entry: { wc: 'lib/wc.ts' },
		deps: { neverBundle: [...RUNTIME_DEPS, './core.js'] },
	},
]);
