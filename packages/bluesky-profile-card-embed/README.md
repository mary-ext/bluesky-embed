# &lt;bluesky-profile-card-embed>

A custom element for embedding Bluesky profile cards.

## Installation

### via npm

```
npm install bluesky-profile-card-embed
```

then, import the package on your app.

```js
import 'bluesky-profile-card-embed';

import 'bluesky-profile-card-embed/style.css';
import 'bluesky-profile-card-embed/themes/light.css';
```

## Usage

```html
<bluesky-profile-card actor="did:plc:2gkh62xvzokhlf6li4ol3b3d">
	<a
		target="_blank"
		href="https://bsky.app/profile/did:plc:2gkh62xvzokhlf6li4ol3b3d"
		class="bluesky-profile-card-fallback"
	>
		@patak.dev's Bluesky profile
	</a>
</bluesky-profile-card>
```

### Attributes

- `actor` **Required**  
  DID or handle of the account
- `allow-unauthenticated` **Optional**  
  Whether to allow unauthenticated viewing
- `service-uri` **Optional**  
  URL to an AppView service, defaults to `https://public.api.bsky.app`

### Events

- `loaded`  
  Fired when the embed has successfully loaded the profile card
- `error`  
  Fired when the embed fails to load the profile card

## SSR usage

The embeds are powered by a static HTML renderer, this renderer can be used directly in your
server-rendering framework of choice for a zero-JS experience.

```tsx
import { fetchProfileCard, renderProfileCard } from 'bluesky-profile-card-embed/core';

import 'bluesky-profile-card-embed/style.css';
import 'bluesky-profile-card-embed/themes/light.css';

// fetch the profile
const controller = new AbortController();
const data = await fetchProfileCard({
	actor: `did:plc:ragtjsm2j2vknwkz3zp4oxrd`,
	signal: controller.signal,
});

// render the profile
const html = renderProfileCard(data);
return (
	<bluesky-profile-card
		actor={data.profile?.did}
		dangerouslySetInnerHTML={{ __html: html }}
	></bluesky-profile-card>
);
```

Check out examples for [Astro](https://github.com/mary-ext/bluesky-embed-astro) and
[SvelteKit](https://github.com/mary-ext/bluesky-embed-sveltekit).
