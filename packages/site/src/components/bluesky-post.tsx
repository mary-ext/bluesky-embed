import { useMemo } from 'preact/hooks';

import { renderPost, type PostData } from 'bluesky-post-embed/core';
import 'bluesky-post-embed/style.css';

const BlueskyPost = ({ data }: { data: PostData }) => {
	const html = useMemo(() => renderPost(data), [data]);

	return <bluesky-post src={data.thread?.post.uri} dangerouslySetInnerHTML={{ __html: html }}></bluesky-post>;
};

export default BlueskyPost;

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
