import '@atcute/bluesky/lexicons';

import { simpleFetchHandler, XRPC, XRPCError } from '@atcute/client';
import { render } from 'svelte/server';

import { DEFAULT_APPVIEW_URL } from 'internal/utils/constants.js';
import type { PostData } from 'internal/types/post.js';

import BlueskyPost from './bluesky-post.svelte';

export type { PostData };

export interface PostFetchOptions {
	/**
	 * AT-URI of the post in question
	 */
	uri: string;
	/**
	 * Abort signal to cancel the request
	 */
	signal?: AbortSignal;
	/**
	 * Whether to fetch post without context (no parent replies)
	 * @default false
	 */
	contextless?: boolean;
	/**
	 * Whether to allow unauthenticated viewing
	 * @default false
	 */
	allowUnauthenticated?: boolean;
	/**
	 * AppView service to use
	 * @default "https://public.api.bsky.app"
	 */
	serviceUri?: string;
}

export const fetchPost = async (opts: PostFetchOptions): Promise<PostData> => {
	const rpc = new XRPC({ handler: simpleFetchHandler({ service: opts.serviceUri ?? DEFAULT_APPVIEW_URL }) });
	const contextless = opts.contextless ?? false;

	const { data } = await rpc
		.get('app.bsky.feed.getPostThread', {
			signal: opts.signal,
			params: {
				uri: opts.uri,
				parentHeight: !contextless ? 2 : 1,
				depth: 0,
			},
		})
		.catch((err) => {
			if (err instanceof XRPCError) {
				if (err.kind === 'NotFound') {
					return { data: null };
				}
			}

			return Promise.reject(err);
		});

	const thread = data?.thread.$type === 'app.bsky.feed.defs#threadViewPost' ? data.thread : null;

	return { thread, contextless, allowUnauthenticated: opts.allowUnauthenticated ?? false };
};

export const renderPost = (data: PostData): string => {
	return render(BlueskyPost, { props: data }).body;
};
