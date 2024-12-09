import '@atcute/bluesky/lexicons';

import { simpleFetchHandler, XRPC, XRPCError } from '@atcute/client';
import { render } from 'svelte/server';

import type { ProfileCardData } from 'internal/types/profile-card.js';
import { DEFAULT_APPVIEW_URL } from 'internal/utils/constants.js';

import BlueskyProfileCard from './bluesky-profile-card.svelte';

export type { ProfileCardData };

export interface ProfileCardFetchOptions {
	/**
	 * Handle or DID identifier of the user
	 */
	actor: string;
	/**
	 * Abort signal to cancel the request
	 */
	signal?: AbortSignal;
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

export const fetchProfileCard = async (opts: ProfileCardFetchOptions): Promise<ProfileCardData> => {
	const actor = opts.actor;
	const allowUnauthenticated = opts.allowUnauthenticated ?? false;

	const rpc = new XRPC({ handler: simpleFetchHandler({ service: opts.serviceUri ?? DEFAULT_APPVIEW_URL }) });

	const { data: profile } = await rpc
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
		});

	return { profile: profile, allowUnauthenticated };
};

export const renderProfileCard = (data: ProfileCardData): string => {
	return render(BlueskyProfileCard, { props: data }).body;
};
