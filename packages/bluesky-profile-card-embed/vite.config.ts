import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { staticSvelte } from 'internal/vite/static-svelte.js';

export default defineConfig({
	base: './',
	build: {
		outDir: 'dist/',
		target: 'esnext',
		minify: false,
		cssMinify: false,
		cssCodeSplit: true,
		lib: {
			entry: {
				core: 'lib/core.ts',
				wc: 'lib/wc.ts',
			},
			formats: ['es'],
		},
		rollupOptions: {
			external: ['@atcute/client', '@atcute/bluesky-richtext-parser'],
		},
	},
	esbuild: {
		target: 'esnext',
	},
	plugins: [
		staticSvelte({
			cssHashPrefix: 'github:mary-ext/bluesky-profile-card-embed/',
			root: __dirname,
		}),
		preact(),
		dts({
			rollupTypes: true,
			tsconfigPath: 'tsconfig.build.json',
			beforeWriteFile(filePath, content) {
				if (filePath.endsWith('/core.d.ts')) {
					// Make sure the relevant types are present
					return { content: `import '@atcute/bluesky/lexicons';\n${content}` };
				}

				return undefined;
			},
		}),
	],
});
