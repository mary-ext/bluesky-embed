import { Client, ClientResponseError, ok, simpleFetchHandler } from '@atcute/client';
import type { ActorIdentifier } from '@atcute/lexicons';

import { render } from 'internal/render/runtime.js';
import type { ProfileFeedData } from 'internal/types/profile-feed.js';
import { DEFAULT_APPVIEW_URL } from 'internal/utils/constants.js';

import BlueskyProfileFeed from './bluesky-profile-feed.svelte';

export type { ProfileFeedData };

export interface ProfileFeedFetchOptions {
	/** Handle or DID identifier of the user */
	actor: string;
	/** Abort signal to cancel the request */
	signal?: AbortSignal;
	/**
	 * Include pinned posts
	 *
	 * @default false
	 */
	includePins?: boolean;
	/**
	 * Allow unauthenticated viewing
	 *
	 * @default false
	 */
	allowUnauthenticated?: boolean;
	/**
	 * AppView service to use
	 *
	 * @default 'https://public.api.bsky.app'
	 */
	serviceUri?: string;
}

export const fetchProfileFeed = async (opts: ProfileFeedFetchOptions): Promise<ProfileFeedData> => {
	const actor = opts.actor as ActorIdentifier;
	const allowUnauthenticated = opts.allowUnauthenticated ?? false;

	const rpc = new Client({
		handler: simpleFetchHandler({ service: opts.serviceUri ?? DEFAULT_APPVIEW_URL }),
	});

	const [profile, timeline] = await Promise.all([
		ok(
			rpc.get('app.bsky.actor.getProfile', {
				signal: opts.signal,
				params: { actor: actor },
			}),
		).catch((err) => {
			if (err instanceof ClientResponseError) {
				if (err.error === 'InvalidRequest' && err.description === 'Profile not found') {
					return null;
				}
			}

			return Promise.reject(err);
		}),
		ok(
			rpc.get('app.bsky.feed.getAuthorFeed', {
				signal: opts.signal,
				params: {
					actor,
					filter: 'posts_no_replies',
					includePins: opts.includePins,
					limit: 30,
				},
			}),
		).catch((err) => {
			if (err instanceof ClientResponseError) {
				if (err.error === 'InvalidRequest' && err.description === 'Profile not found') {
					return { feed: [] };
				}
			}

			return Promise.reject(err);
		}),
	]);

	return { profile: profile, feed: timeline.feed, allowUnauthenticated };
};

export const renderProfileFeed = (data: ProfileFeedData): string => {
	return render(BlueskyProfileFeed, data);
};
