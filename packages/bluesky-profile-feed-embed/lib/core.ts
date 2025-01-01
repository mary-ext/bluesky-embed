import '@atcute/bluesky/lexicons';

import { simpleFetchHandler, XRPC, XRPCError } from '@atcute/client';
import { render } from 'svelte/server';

import { DEFAULT_APPVIEW_URL } from 'internal/utils/constants.js';
import type { ProfileFeedData } from 'internal/types/profile-feed.js';

import BlueskyProfileFeed from './bluesky-profile-feed.svelte';

export type { ProfileFeedData };

export interface ProfileFeedFetchOptions {
	/**
	 * Handle or DID identifier of the user
	 */
	actor: string;
	/**
	 * Abort signal to cancel the request
	 */
	signal?: AbortSignal;
	/**
	 * Include pinned posts
	 * @default false
	 */
	includePins?: boolean;
	/**
	 * Allow unauthenticated viewing
	 * @default false
	 */
	allowUnauthenticated?: boolean;
	/**
	 * AppView service to use
	 * @default "https://public.api.bsky.app"
	 */
	serviceUri?: string;
}

export const fetchProfileFeed = async (opts: ProfileFeedFetchOptions): Promise<ProfileFeedData> => {
	const actor = opts.actor;
	const allowUnauthenticated = opts.allowUnauthenticated ?? false;

	const rpc = new XRPC({ handler: simpleFetchHandler({ service: opts.serviceUri ?? DEFAULT_APPVIEW_URL }) });

	const [{ data: profile }, { data: timeline }] = await Promise.all([
		rpc
			.get('app.bsky.actor.getProfile', {
				signal: opts.signal,
				params: { actor },
			})
			.catch((err) => {
				if (err instanceof XRPCError) {
					if (err.kind === 'InvalidRequest' && err.description === 'Profile not found') {
						return { data: null };
					}
				}

				return Promise.reject(err);
			}),
		rpc
			.get('app.bsky.feed.getAuthorFeed', {
				signal: opts.signal,
				params: {
					actor,
					filter: 'posts_no_replies',
					includePins: opts.includePins,
					limit: 30,
				},
			})
			.catch((err) => {
				if (err instanceof XRPCError) {
					if (err.kind === 'InvalidRequest' && err.description === 'Profile not found') {
						return { data: { feed: [] } };
					}
				}

				return Promise.reject(err);
			}),
	]);

	return { profile: profile, feed: timeline.feed, allowUnauthenticated };
};

export const renderProfileFeed = (data: ProfileFeedData): string => {
	return render(BlueskyProfileFeed, { props: data }).body;
};
