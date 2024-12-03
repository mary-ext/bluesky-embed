# &lt;bluesky-post-embed>

A custom element for embedding Bluesky posts.

## Installation

### via npm

```
npm install bluesky-post-embed
```

then, import the package on your app.

```js
import 'bluesky-post-embed';

import 'bluesky-post-embed/style.css';
import 'bluesky-post-embed/themes/light.css';
```

## Usage

```html
<bluesky-post src="at://did:plc:ragtjsm2j2vknwkz3zp4oxrd/app.bsky.feed.post/3kj2umze7zj2n">
	<blockquote class="bluesky-post-fallback">
		<p dir="auto">angel mode</p>
		— Paul Frazee (@pfrazee.com)
		<a href="https://bsky.app/profile/did:plc:ragtjsm2j2vknwkz3zp4oxrd/post/3kj2umze7zj2n"
			>January 16, 2024 at 9:11 AM</a
		>
	</blockquote>
</bluesky-post>
```

### Attributes

- `src` **Required**  
  AT-URI of the post record
- `contextless` **Optional**  
  Whether to show the post without any context (no parent reply)
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
import { fetchPost, renderPost } from 'bluesky-post-embed/core';

import 'bluesky-post-embed/style.css';
import 'bluesky-post-embed/themes/light.css';

// fetch the post
const controller = new AbortController();
const data = await fetchPost({
	src: `at://did:plc:ragtjsm2j2vknwkz3zp4oxrd/app.bsky.feed.post/3kj2umze7zj2n`,
	signal: controller.signal,
});

// render the post
const html = renderPost(data);
return (
	<bluesky-post
		src={data.thread?.post.uri}
		dangerouslySetInnerHTML={{ __html: html }}
	></bluesky-post>
);
```

Check out examples for [Astro](https://github.com/mary-ext/bluesky-embed-astro) and
[SvelteKit](https://github.com/mary-ext/bluesky-embed-sveltekit).
