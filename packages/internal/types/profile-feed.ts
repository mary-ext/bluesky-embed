import type { AppBskyActorDefs, AppBskyFeedDefs } from '@atcute/client/lexicons';

export interface ProfileFeedData {
	profile: AppBskyActorDefs.ProfileViewDetailed | null;
	feed: AppBskyFeedDefs.FeedViewPost[];
	allowUnauthenticated: boolean;
}
