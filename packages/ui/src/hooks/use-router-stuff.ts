import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useRouterStuff() {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const queryParams = ({
		set,
		del,
		replace,
		getNewPath,
		arrayDelimiter = ',',
	}: {
		set?: Record<string, string | string[]>;
		del?: string | string[];
		replace?: boolean;
		getNewPath?: boolean;
		arrayDelimiter?: string;
	}) => {
		const newParams = new URLSearchParams(searchParams);

		if (set) {
			for (const [k, v] of Object.entries(set)) {
				newParams.set(k, Array.isArray(v) ? v.join(arrayDelimiter) : v);
			}
		}

		if (del) {
			if (Array.isArray(del)) {
				for (const k of del) {
					newParams.delete(k);
				}
			} else {
				newParams.delete(del);
			}
		}

		const queryString = newParams.toString();

		const newPath = `${pathname}${
			queryString.length > 0 ? `?${queryString}` : ''
		}`;

		if (getNewPath) return newPath;

		if (replace) {
			router.replace(newPath, { scroll: false });
		} else {
			router.push(newPath);
		}
	};

	return {
		pathname,
		router,
		searchParams,
		queryParams,
	};
}
