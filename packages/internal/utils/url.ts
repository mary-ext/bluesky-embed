const HAS_URL_PARSE = 'parse' in URL;

/**
 * parses a string as an HTTP(S) URL
 *
 * @param str string to parse
 * @returns the parsed URL, or `null` if it's invalid
 */
export const safeParseUrl = (str: string): URL | null => {
	let url: URL | null | undefined;
	if (HAS_URL_PARSE) {
		url = URL.parse(str);
	} else {
		try {
			url = new URL(str);
		} catch {
			// noop
		}
	}

	if (url && (url.protocol === 'https:' || url.protocol === 'http:')) {
		return url;
	}

	return null;
};
