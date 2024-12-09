import type { AppBskyActorDefs } from '@atcute/client/lexicons';

export interface ProfileCardData {
	profile: AppBskyActorDefs.ProfileViewDetailed | null;
	allowUnauthenticated: boolean;
}
