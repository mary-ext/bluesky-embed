# &lt;bluesky-profile-feed-embed>

> [!CAUTION]  
> This is a new, work-in-progress version of `bluesky-post-embed`, things aren't done yet.

A custom element for embedding Bluesky profile feeds.

## Installation

### via npm

```
npm install bluesky-profile-feed-embed
```

then, import the package on your app.

```js
import 'bluesky-profile-feed-embed';

import 'bluesky-profile-feed-embed/style.css';
import 'bluesky-profile-feed-embed/themes/light.css';
```

## Usage

```html
<bluesky-profile-feed actor="did:plc:ragtjsm2j2vknwkz3zp4oxrd" include-pins>
	<a
		target="_blank"
		href="https://bsky.app/profile/did:plc:ragtjsm2j2vknwkz3zp4oxrd"
		class="bluesky-profile-feed-fallback"
	>
		Posts by Paul Frazee (@pfrazee.com)
	</a>
</bluesky-profile-feed>
```

### Attributes

- `actor` **Required**  
  DID or handle of the account
- `include-pins` **Optional**  
  Whether to show pinned posts
- `allow-unauthenticated` **Optional**  
  Whether to allow unauthenticated viewing
- `service-uri` **Optional**  
  URL to an AppView service, defaults to `https://public.api.bsky.app`

### Events

- `loaded`  
  Fired when the embed has successfully loaded the post
- `error`  
  Fired when the embed fails to load the post

## SSR usage

The embeds are powered by a static HTML renderer, this renderer can be used directly in your
server-rendering framework of choice for a zero-JS experience.

```tsx
import { fetchProfileFeed, renderProfileFeed } from 'bluesky-profile-feed-embed/core';

import 'bluesky-post-embed/style.css';
import 'bluesky-post-embed/themes/light.css';

// fetch the profile
const controller = new AbortController();
const data = await fetchProfileFeed({
	actor: `did:plc:ragtjsm2j2vknwkz3zp4oxrd`,
	includePins: true,
	signal: controller.signal,
});

// render the profile
const html = renderProfileFeed(data);
return (
	<bluesky-profile-feed
		src={data.thread?.post.uri}
		dangerouslySetInnerHTML={{ __html: html }}
	></bluesky-profile-feed>
);
```

Check out examples for [Astro](https://github.com/mary-ext/bluesky-embed-astro) and
[SvelteKit](https://github.com/mary-ext/bluesky-embed-sveltekit).
