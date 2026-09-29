import type { AppBskyActorDefs, AppBskyFeedDefs } from '@atcute/bluesky';

export interface ProfileFeedData {
	profile: AppBskyActorDefs.ProfileViewDetailed | null;
	feed: AppBskyFeedDefs.FeedViewPost[];
	allowUnauthenticated: boolean;
}
