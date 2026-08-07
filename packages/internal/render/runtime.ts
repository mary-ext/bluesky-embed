let output = '';

export function push(content: string): void {
	output += content;
}

// oxlint-disable-next-line typescript/no-explicit-any
export function render(component: (...args: any[]) => unknown, props: unknown): string {
	try {
		output = '';
		component(props);

		return output;
	} finally {
		output = '';
	}
}

const ATTR_REGEX = /[&"<]/g;
const CONTENT_REGEX = /[&<]/g;

export function escape(value: unknown, isAttribute = false): string {
	// oxlint-disable-next-line typescript/no-base-to-string
	const input = String(value ?? '');
	const pattern = isAttribute ? ATTR_REGEX : CONTENT_REGEX;
	pattern.lastIndex = 0;

	let escaped = '';
	let last = 0;
	while (pattern.test(input)) {
		const index = pattern.lastIndex - 1;
		const character = input[index];
		escaped +=
			input.substring(last, index) + (character === '&' ? '&amp;' : character === '"' ? '&quot;' : '&lt;');
		last = index + 1;
	}

	return escaped + input.substring(last);
}

export function attr(name: string, value: unknown, isBoolean = false): string {
	if (value == null || (!value && isBoolean)) {
		return '';
	}

	return ` ${name}${isBoolean ? `=""` : `="${escape(value, true)}"`}`;
}

export function attr_class(value: unknown, hash?: string): string {
	// oxlint-disable-next-line typescript/no-base-to-string
	let className = value == null ? '' : String(value);
	if (hash) {
		className = className ? `${className} ${hash}` : hash;
	}

	return className ? ` class="${escape(className, true)}"` : '';
}

export function attr_style(value: unknown): string {
	// oxlint-disable-next-line typescript/no-base-to-string
	const style = value == null ? null : String(value);
	return style ? ` style="${escape(style, true)}"` : '';
}
