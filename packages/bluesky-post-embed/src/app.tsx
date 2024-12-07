import { useEffect, useMemo, useState } from 'preact/hooks';

import type { PostData } from 'internal/types/post.js';
import { fetchPost, renderPost } from '../lib/core';

const uri = `at://did:plc:ragtjsm2j2vknwkz3zp4oxrd/app.bsky.feed.post/3kj2umze7zj2n`;

const App = () => {
	const [state, setState] = useState<{ uri: string; data: PostData }>();

	useEffect(() => {
		if (state && state.uri === uri) {
			return;
		}

		const controller = new AbortController();
		const promise = fetchPost({
			uri: uri,
			signal: controller.signal,
			allowUnauthenticated: true,
		});

		promise.then((data) => {
			setState({ uri, data });
		});

		return () => {
			controller.abort();
		};
	}, [uri]);

	return <div class="app">{state && <BlueskyPost data={state.data} />}</div>;
};

export default App;

const BlueskyPost = ({ data }: { data: PostData }) => {
	const html = useMemo(() => renderPost(data), [data]);

	return <bluesky-post src={data.thread?.post.uri} dangerouslySetInnerHTML={{ __html: html }}></bluesky-post>;
};

declare module 'preact' {
	namespace JSX {
		interface BlueskyPostAttributes extends HTMLAttributes<HTMLElement> {
			src?: string;
		}

		interface IntrinsicElements {
			'bluesky-post': BlueskyPostAttributes;
		}
	}
}
