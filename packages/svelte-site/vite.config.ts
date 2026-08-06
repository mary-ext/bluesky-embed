import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

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
