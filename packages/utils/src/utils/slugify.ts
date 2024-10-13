export function slugify(text: string): string {
	return text
		.toString()
		.normalize('NFD')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
		.replace(/^-+|-+$/g, '')
		.toLowerCase();
}
