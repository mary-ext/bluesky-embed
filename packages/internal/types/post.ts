import type { AppBskyFeedDefs, Brand } from '@atcute/client/lexicons';

export interface PostData {
	thread: Brand.Union<AppBskyFeedDefs.ThreadViewPost> | null;
	contextless: boolean;
	allowUnauthenticated: boolean;
}
