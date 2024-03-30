import { defineConfig } from 'vite';

import babel from '@rollup/plugin-babel';
import dts from 'vite-plugin-dts';

export default defineConfig({
	base: '/',
	optimizeDeps: {
		include: ['@intrnl/jsx-to-string/runtime'],
	},
	build: {
		sourcemap: true,
		target: 'esnext',
		minify: false,
		cssMinify: true,
		lib: {
			entry: {
				core: 'lib/core.tsx',
				element: 'lib/index.ts',
			},
			formats: ['es'],
		},
		rollupOptions: {
			external: [
				'@externdefs/bluesky-client',
				'@externdefs/bluesky-client/lexicons',
				'@externdefs/bluesky-client/xrpc',
			],
		},
	},
	esbuild: {
		target: 'es2022',
	},
	plugins: [
		{
			enforce: 'pre',
			...babel({
				babelrc: false,
				babelHelpers: 'bundled',
				extensions: ['.tsx'],
				plugins: [['@babel/plugin-syntax-typescript', { isTSX: true }], ['@intrnl/jsx-to-string/babel']],
			}),
		},
		dts({ rollupTypes: true }),
	],
});
