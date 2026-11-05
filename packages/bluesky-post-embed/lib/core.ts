import type { AppBskyFeedDefs, AppBskyUnspeccedGetPostThreadV2 } from '@atcute/bluesky';
import { Client, ok, simpleFetchHandler } from '@atcute/client';
import type { ResourceUri } from '@atcute/lexicons';

import { render } from 'internal/render/runtime.js';
import type { PostData, PostThreadItem } from 'internal/types/post.js';
import { DEFAULT_APPVIEW_URL } from 'internal/utils/constants.js';

import BlueskyPost from './bluesky-post.svelte';

export type { PostData, PostThreadItem };

export interface PostFetchOptions {
	/** AT-URI of the post in question */
	uri: string;
	/** Abort signal to cancel the request */
	signal?: AbortSignal;
	/**
	 * Whether to fetch post without context (no parent replies)
	 *
	 * @default false
	 */
	contextless?: boolean;
	/**
	 * AppView service to use
	 *
	 * @default 'https://public.api.bsky.app'
	 */
	serviceUri?: string;
}

export const fetchPost = async (opts: PostFetchOptions): Promise<PostData> => {
	const rpc = new Client({
		handler: simpleFetchHandler({ service: opts.serviceUri ?? DEFAULT_APPVIEW_URL }),
	});

	// `above` is all-or-nothing, we need it even when contextless for the reply context
	const data = await ok(
		rpc.get('app.bsky.unspecced.getPostThreadV2', {
			signal: opts.signal,
			params: {
				anchor: opts.uri as ResourceUri,
				above: true,
				below: 0,
			},
		}),
	);

	const thread = data.thread;

	const anchor = thread.find((item) => item.depth === 0);
	switch (anchor?.value.$type) {
		case 'app.bsky.unspecced.defs#threadItemPost': {
			break;
		}
		case 'app.bsky.unspecced.defs#threadItemNoUnauthenticated': {
			return { type: 'no-unauthenticated' };
		}
		default: {
			return { type: 'not-found' };
		}
	}

	const parentPost = getThreadPost(thread, -1);

	let parent: PostThreadItem | null = null;
	if (!opts.contextless && parentPost !== null) {
		parent = { post: parentPost, parent: getThreadPost(thread, -2) };
	}

	return {
		type: 'thread',
		anchor: { post: anchor.value.post, parent: parentPost },
		parent,
	};
};

const getThreadPost = (
	thread: AppBskyUnspeccedGetPostThreadV2.ThreadItem[],
	depth: number,
): AppBskyFeedDefs.PostView | null => {
	const item = thread.find((item) => item.depth === depth);
	if (item?.value.$type === 'app.bsky.unspecced.defs#threadItemPost') {
		return item.value.post;
	}

	return null;
};

export const renderPost = (data: PostData): string => {
	return render(BlueskyPost, { data });
};
