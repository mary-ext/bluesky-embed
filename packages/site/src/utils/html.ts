export const escapeHtml = (text: string): string => {
	return text.replace(/[<"&]/g, (c) => '&#' + c.charCodeAt(0) + ';');
};
