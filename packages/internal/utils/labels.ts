import type { At, ComAtprotoLabelDefs } from '@atcute/client/lexicons';

export const FlagsNone = 0;
export const FlagsNoSelf = 1 << 0;

type Label = ComAtprotoLabelDefs.Label;

export interface LabelDefinition {
	name: string;
	flags: number;
}

export const LABEL_MAPPING: Record<string, LabelDefinition> = {
	'!hide': {
		name: `Hidden by moderators`,
		flags: FlagsNoSelf,
	},
	'!warn': {
		name: `Content warning`,
		flags: FlagsNoSelf,
	},

	porn: {
		name: `Adult content`,
		flags: FlagsNone,
	},
	sexual: {
		name: `Sexually suggestive`,
		flags: FlagsNone,
	},
	'graphic-media': {
		name: `Graphic media`,
		flags: FlagsNone,
	},
	nudity: {
		name: `Nudity`,
		flags: FlagsNone,
	},
};

export const findLabel = (labels: Label[] | undefined, authorDid: At.DID): LabelDefinition | undefined => {
	if (labels?.length) {
		for (let idx = 0, len = labels.length; idx < len; idx++) {
			const label = labels[idx];
			const val = label.val;

			if (!(val in LABEL_MAPPING)) {
				continue;
			}

			const def = LABEL_MAPPING[val];

			if (def.flags & FlagsNoSelf && label.src === authorDid) {
				continue;
			}

			return def;
		}
	}
};
