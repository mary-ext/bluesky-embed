import { fetchProfileCard, renderProfileCard } from './core';

export class BlueskyProfileCard extends HTMLElement {
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

		let data;
		try {
			data = await fetchProfileCard({ actor, allowUnauthenticated, serviceUri });
		} catch (error) {
			console.warn('Failed to fetch profile card:', error);
			// Leave the fallback content in place
			return;
		}

		const html = renderProfileCard(data);

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

customElements.define('bluesky-profile-card', BlueskyProfileCard);
