import * as path from 'node:path';

import { compile as compileSvelte } from 'svelte/compiler';
import { type Plugin, createFilter, defineConfig } from 'vite';

import preact from '@preact/preset-vite';
import dts from 'vite-plugin-dts';

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
			external: ['@atcute/client', '@atcute/bluesky-richtext-segmenter'],
		},
	},
	esbuild: {
		target: 'esnext',
	},
	plugins: [
		svelte(),
		preact(),
		dts({
			rollupTypes: true,
			tsconfigPath: 'tsconfig.build.json',
			beforeWriteFile(filePath, content) {
				if (filePath.endsWith('/core.d.ts')) {
					// Make sure the relevant types are present
					return { content: `import '@atcute/bluesky/lexicons';\n${content}` };
				}
			},
		}),
	],
});

function svelte(): Plugin {
	const filter = createFilter('**/*.svelte');
	const stylesheets = new Map<string, string>();

	return {
		name: 'svelte',
		resolveId(id) {
			return stylesheets.has(id) ? id : null;
		},
		load(id) {
			const css = stylesheets.get(id);
			if (css !== undefined) {
				this.addWatchFile(id.slice(0, -4));
				return { code: css };
			}

			return null;
		},
		transform(source, id) {
			if (!filter(id)) {
				return null;
			}

			const result = compileSvelte(source, {
				generate: 'server',
				css: 'external',
				cssHash({ hash, filename }) {
					const prefix = `github:mary-ext/bluesky-post-embed/`;
					return `s-` + hash(prefix + path.relative(__dirname, filename));
				},
				runes: true,
				filename: id,
			});

			{
				const { js, css, warnings } = result;

				// nasty hacks to get smaller sizes
				let jsCode = js.code
					.replace(/<!--.*?-->/g, '')
					.replace(/\$\$slots: {.+?},?/g, '')
					.replace(/\$\$payload\.out \+= ["`]{2};|\$\.(push|pop)\(\);/g, '')
					.replace(/(?<=\$\$payload\.out \+= )`\${([a-zA-Z0-9_$.,()[\]\s]+?)}`(?=;)/, '$1');

				if (css) {
					const cssId = `${id}.css`;
					jsCode = jsCode + `\nimport ${JSON.stringify(cssId)};\n`;
					stylesheets.set(cssId, css.code);
				}

				for (const warn of warnings) {
					this.warn(warn);
				}

				return { code: jsCode };
			}
		},
	};
}
