export function isValidJson(text: string) {
	try {
		JSON.parse(text);
	} catch (e) {
		return false;
	}

	return true;
}
