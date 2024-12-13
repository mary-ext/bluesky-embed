import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({
	base: './',
	build: {
		target: 'esnext',
		minify: 'terser',
	},
	esbuild: {
		target: 'esnext',
	},
	plugins: [svelte()],
});
