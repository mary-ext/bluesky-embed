import { is_at_identifier, is_tid } from './strings';

export interface ExtractedPostInfo {
	type: 'post';
	author: string;
	rkey: string;
}

export interface ExtractedProfileInfo {
	type: 'profile';
	actor: string;
}

export type ExtractedInfo = ExtractedPostInfo | ExtractedProfileInfo;

export const extract_url = (str: string): ExtractedInfo | null => {
	const url = safe_parse_url(str);
	if (!url) {
		return null;
	}

	let match: RegExpExecArray | null | undefined;
	if (url.host === 'bsky.app' || url.host === 'staging.bsky.app' || url.host === 'main.bsky.dev') {
		if ((match = /^\/profile\/([^/]+)\/post\/([^/]+)\/?$/.exec(url.pathname))) {
			if (!is_at_identifier(match[1]) || !is_tid(match[2])) {
				return null;
			}

			return { type: 'post', author: match[1], rkey: match[2] };
		}

		if ((match = /^\/profile\/([^/]+)\/?$/.exec(url.pathname))) {
			if (!is_at_identifier(match[1])) {
				return null;
			}

			return { type: 'profile', actor: match[1] };
		}
	}

	return null;
};

const safe_parse_url = (str: string): URL | null => {
	let url: URL | null | undefined;
	if ('parse' in URL) {
		url = URL.parse(str);
	} else {
		try {
			// @ts-expect-error: `'parse' in URL` is giving truthy
			url = new URL(str);
		} catch {}
	}

	if (url && (url.protocol === 'https:' || url.protocol === 'http:')) {
		return url;
	}

	return null;
};
