export const escape_html = (text: string): string => {
	return text.replace(/[<"&]/g, (c) => '&#' + c.charCodeAt(0) + ';');
};
