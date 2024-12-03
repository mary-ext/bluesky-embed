import { useMemo } from 'preact/hooks';

import { renderProfileFeed, type ProfileFeedData } from 'bluesky-profile-feed-embed/core';
import 'bluesky-profile-feed-embed/style.css';

const BlueskyProfileFeed = ({ data }: { data: ProfileFeedData }) => {
	const html = useMemo(() => renderProfileFeed(data), [data]);

	return (
		<bluesky-profile-feed
			actor={data.profile?.did}
			dangerouslySetInnerHTML={{ __html: html }}
		></bluesky-profile-feed>
	);
};

export default BlueskyProfileFeed;

declare module 'preact' {
	namespace JSX {
		interface BlueskyProfileFeedAttributes extends HTMLAttributes<HTMLElement> {
			actor?: string;
		}

		interface IntrinsicElements {
			'bluesky-profile-feed': BlueskyProfileFeedAttributes;
		}
	}
}
