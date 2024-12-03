export const getProfileUrl = (author: string): string => {
	return `https://bsky.app/profile/${author}`;
};

export const getPostUrl = (author: string, rkey: string): string => {
	return `https://bsky.app/profile/${author}/post/${rkey}`;
};

export const getHashtagUrl = (tag: string): string => {
	return `https://bsky.app/hashtag/${tag}`;
};

export const getFeedUrl = (author: string, rkey: string): string => {
	return `https://bsky.app/profile/${author}/feed/${rkey}`;
};

export const getListUrl = (author: string, rkey: string): string => {
	return `https://bsky.app/profile/${author}/list/${rkey}`;
};

export const getStarterpackUrl = (author: string, rkey: string): string => {
	return `https://bsky.app/starter-pack/${author}/${rkey}`;
};

export const getStarterpackImgUrl = (author: string, rkey: string): string => {
	return `https://ogcard.cdn.bsky.app/start/${author}/${rkey}`;
};
