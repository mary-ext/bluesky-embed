import { fetchProfileFeed, renderProfileFeed } from './core';

export class BlueskyProfileFeed extends HTMLElement {
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
		const actor = this.getAttribute('actor')!;
		const serviceUri = this.getAttribute('service-uri') || undefined;
		const allowUnauthenticated = this.getAttribute('allow-unauthenticated') !== null;
		const includePins = this.getAttribute('include-pins') !== null;
		const silent = this.getAttribute('silent') !== null;

		const data = await fetchProfileFeed({ actor, allowUnauthenticated, includePins, serviceUri }).catch(
			(error) => {
				if (silent) {
					console.warn('Failed to fetch profile feed:', error);
					return null;
				}
				throw error;
			},
		);

		if (data === null) {
			return;
		}

		const html = renderProfileFeed(data);

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

customElements.define('bluesky-profile-feed', BlueskyProfileFeed);
