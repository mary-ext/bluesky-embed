import { Client, ClientResponseError, ok, simpleFetchHandler } from '@atcute/client';
import type { ActorIdentifier } from '@atcute/lexicons';

import { render } from 'internal/render/runtime.js';
import type { ProfileCardData } from 'internal/types/profile-card.js';
import { DEFAULT_APPVIEW_URL } from 'internal/utils/constants.js';

import BlueskyProfileCard from './bluesky-profile-card.svelte';

export type { ProfileCardData };

export interface ProfileCardFetchOptions {
	/** Handle or DID identifier of the user */
	actor: string;
	/** Abort signal to cancel the request */
	signal?: AbortSignal;
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

export const fetchProfileCard = async (opts: ProfileCardFetchOptions): Promise<ProfileCardData> => {
	const actor = opts.actor;
	const allowUnauthenticated = opts.allowUnauthenticated ?? false;

	const rpc = new Client({
		handler: simpleFetchHandler({ service: opts.serviceUri ?? DEFAULT_APPVIEW_URL }),
	});

	const profile = await ok(
		rpc.get('app.bsky.actor.getProfile', {
			signal: opts.signal,
			params: { actor: actor as ActorIdentifier },
		}),
	).catch((err) => {
		if (err instanceof ClientResponseError) {
			if (err.error === 'InvalidRequest' && err.description === 'Profile not found') {
				return null;
			}
		}

		return Promise.reject(err);
	});

	return { profile: profile, allowUnauthenticated };
};

export const renderProfileCard = (data: ProfileCardData): string => {
	return render(BlueskyProfileCard, data);
};
