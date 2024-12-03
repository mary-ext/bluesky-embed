let startOfYear = 0;
let endOfYear = 0;

const fmtAbsoluteLong = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' });
const fmtAbsShortWithYear = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });
const fmtAbsShort = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

export const formatShortDate = (date: string | number): string => {
	const inst = new Date(date);
	const time = inst.getTime();

	if (isNaN(time)) {
		return 'N/A';
	}

	const now = Date.now();
	if (now > endOfYear) {
		const date = new Date(now);

		date.setMonth(0, 1);
		date.setHours(0, 0, 0);
		startOfYear = date.getTime();

		date.setFullYear(date.getFullYear() + 1, 0, 0);
		date.setHours(23, 59, 59, 999);
		endOfYear = date.getTime();
	}

	if (time >= startOfYear && time <= endOfYear) {
		return fmtAbsShort.format(inst);
	}

	return fmtAbsShortWithYear.format(inst);
};

export const formatLongDate = (date: string | number): string => {
	const inst = new Date(date);

	if (isNaN(inst.getTime())) {
		return 'N/A';
	}

	return fmtAbsoluteLong.format(inst);
};
