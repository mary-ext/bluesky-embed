import type { AppBskyFeedDefs } from '@atcute/bluesky';

/** a post to render, along with what it replies to */
export interface PostThreadItem {
	post: AppBskyFeedDefs.PostView;
	/** the post this one replies to, used for reply context; null if unavailable */
	parent: AppBskyFeedDefs.PostView | null;
}

/**
 * result of `fetchPost`:
 *
 * - `thread`: the post is viewable
 * - `not-found`: the post doesn't exist or is otherwise unavailable
 * - `no-unauthenticated`: the author has opted out of being viewed while logged out
 */
export type PostData =
	| {
			type: 'thread';
			/** the requested post */
			anchor: PostThreadItem;
			/** the post shown above the requested post; null if contextless or unavailable */
			parent: PostThreadItem | null;
	  }
	| { type: 'not-found' }
	| { type: 'no-unauthenticated' };
