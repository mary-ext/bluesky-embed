import type { AppBskyFeedDefs } from '@atcute/bluesky';
import type { $type } from '@atcute/lexicons';

export interface PostData {
	thread: $type.enforce<AppBskyFeedDefs.ThreadViewPost> | null;
	contextless: boolean;
	allowUnauthenticated: boolean;
}
