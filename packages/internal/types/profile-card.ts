import type { AppBskyActorDefs } from '@atcute/bluesky';

export interface ProfileCardData {
	profile: AppBskyActorDefs.ProfileViewDetailed | null;
	allowUnauthenticated: boolean;
}
