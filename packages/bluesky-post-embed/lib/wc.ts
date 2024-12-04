import { fetchPost, renderPost } from './core';

export class BlueskyPost extends HTMLElement {
	connectedCallback() {
		this.load().then(
			() => this.dispatchEvent(new CustomEvent('loaded')),
			(err) => {
				const defaulted = this.dispatchEvent(new CustomEvent('error', { detail: err }));
				if (defaulted) {
					throw err;
				}
			},
		);
	}

	async load() {
		const src = this.getAttribute('src')!;
		const serviceUri = this.getAttribute('service-uri') || undefined;
		const contextless = this.getAttribute('contextless') !== null;
		const allowUnauthenticated = this.getAttribute('allow-unauthenticated') !== null;

		const data = await fetchPost({ uri: src, contextless, allowUnauthenticated, serviceUri });
		const html = renderPost(data);

		const root = this.shadowRoot;

		if (!root) {
			this.innerHTML = html;
		} else {
			const template = document.createElement('template');
			template.innerHTML = html;

			const fragment = template.content;
			const slot = root.querySelector('slot');

			if (slot) {
				slot.replaceWith(fragment);
			} else {
				root.appendChild(fragment);
			}
		}
	}
}

customElements.define('bluesky-post', BlueskyPost);
