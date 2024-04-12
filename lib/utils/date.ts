export const abs_long = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' });
export const abs_short = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });

export const format_date = (formatter: Intl.DateTimeFormat, date: string | number) => {
	const inst = new Date(date);

	if (isNaN(inst.getTime())) {
		return 'N/A';
	}

	return formatter.format(inst);
};
