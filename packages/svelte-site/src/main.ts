import { mount } from 'svelte';

import './styles/normalize.css';
import 'bluesky-post-embed/themes/light.css';

import App from './App.svelte';

mount(App, {
	target: document.getElementById('app')!,
});
