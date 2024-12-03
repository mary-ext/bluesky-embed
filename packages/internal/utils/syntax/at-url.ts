export const AT_URI_RE =
	/^at:\/\/((?:did:[a-zA-Z0-9._:%-]+)|(?:[a-zA-Z0-9][a-zA-Z0-9-.]*))(?:\/([a-zA-Z0-9.-]+)(?:\/([a-zA-Z0-9_~.:-]{1,512}))?)?\/?(?:\?([^#\s]*))?(?:#([^\s]*))?$/;

export interface ParsedAtUri {
	repo: string;
	collection: string;
	rkey: string;
	query: string;
	fragment: string;
}

export const parseAtUri = (str: string): ParsedAtUri => {
	const match = AT_URI_RE.exec(str);
	if (!match) {
		throw new InvalidAtUriError(`invalid at-uri: ${str}`);
	}

	return {
		repo: match[1],
		collection: match[2] ?? '',
		rkey: match[3] ?? '',
		query: match[4] ?? '',
		fragment: match[5] ?? '',
	};
};

export class InvalidAtUriError extends Error {}
