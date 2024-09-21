type QDrantFilterReturn =
	| {
			key: string;
			match: { value: string };
	  }
	| {
			key: string;
			match: { any: string[] };
	  };

export function createQDrantFilter(
	key: string,
	value: string | string[] | undefined,
	isAny = false,
): QDrantFilterReturn | null {
	return value !== undefined
		? ({
				key,
				match: isAny ? { any: value as string[] } : { value: value as string },
			} as QDrantFilterReturn)
		: null;
}
