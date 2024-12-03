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

		const data = await fetchProfileFeed({ actor, allowUnauthenticated, includePins, serviceUri });
		const html = renderProfileFeed(data);

		this.innerHTML = html;
	}
}

customElements.define('bluesky-profile-feed', BlueskyProfileFeed);
