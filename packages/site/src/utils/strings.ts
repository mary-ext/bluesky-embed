export const RECORD_KEY_RE = /^(?!\.{1,2}$)[a-zA-Z0-9_~.:-]{1,512}$/;

export const isValidRecordKey = (str: string): boolean => {
	return str.length >= 1 && str.length <= 512 && RECORD_KEY_RE.test(str);
};

export const DID_RE = /^did:([a-z]+):([a-zA-Z0-9._:%-]*[a-zA-Z0-9._-])$/;

export const isValidDid = (str: string): boolean => {
	return str.length >= 7 && str.length <= 2048 && DID_RE.test(str);
};

export const HANDLE_RE =
	/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;

export const isValidHandle = (str: string): boolean => {
	return str.length >= 3 && str.length <= 253 && HANDLE_RE.test(str);
};

export const isValidAtIdentifier = (str: string): boolean => {
	return isValidDid(str) || isValidHandle(str);
};
