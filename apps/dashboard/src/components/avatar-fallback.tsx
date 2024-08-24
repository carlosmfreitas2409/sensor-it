import { DICEBEAR_AVATAR_URL } from '@sensor-it/utils/constants';

import {
	Avatar,
	AvatarImage,
	AvatarFallback as AvatarFallbackUI,
} from '@sensor-it/ui/components';

interface AvatarWithFallbackProps
	extends React.ComponentPropsWithoutRef<typeof Avatar> {
	alt: string;
	src?: string | null;
	fallback?: 'dicebar' | 'initials';
}

export function AvatarWithFallback({
	src,
	alt,
	fallback = 'dicebar',
	...props
}: AvatarWithFallbackProps) {
	const fallbackSrc = {
		dicebar: `${DICEBEAR_AVATAR_URL}${alt}`,
		initials: undefined,
	}[fallback];

	return (
		<Avatar {...props}>
			<AvatarImage src={src || fallbackSrc} />
			<AvatarFallbackUI>{alt.slice(0, 2).toUpperCase()}</AvatarFallbackUI>
		</Avatar>
	);
}
