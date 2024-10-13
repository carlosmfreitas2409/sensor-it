import type { Icon } from '.';

type SensorItMarkProps = Icon & {
	variant?: 'purple' | 'green';
};

const variantColors = {
	purple: {
		primary: '#B692F6',
		secondary: '#9E77ED',
		tertiary: '#7F56D9',
	},
	green: {
		primary: '#25B4A2',
		secondary: '#15A295',
		tertiary: '#166F75',
	},
};

export function SensorItMark({
	variant = 'purple',
	...props
}: SensorItMarkProps) {
	const colors = variantColors[variant];

	return (
		<svg
			width="32"
			height="32"
			viewBox="0 0 32 32"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M16 16H0L16 0V16Z" fill={colors.primary} />
			<path d="M16 16H32L16 0V16Z" fill={colors.secondary} />
			<path d="M16 16H32L16 32V16Z" fill={colors.tertiary} />
			<path d="M16 16H0L16 32V16Z" fill={colors.secondary} />
			<path
				d="M16 5.52727L24.4364 8.43636L25.1021 12.4709L25.6 15.9428L24.5818 23.4182L16 32L7.41818 23.4182L6.10909 15.9428L6.7493 12.2539L7.56364 8.43636L16 5.52727Z"
				fill="#24273A"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M15.997 24.4364L22.6909 20.3636V11.9273L16.0032 7.85455L9.30909 11.9273V20.3636L15.997 24.4364ZM11.5818 18.4609L15.997 21.2915L20.1644 18.4609V13.5312L16.0032 10.9994L11.5818 13.5312V18.4609Z"
				fill="#FAF3EB"
			/>
			<path
				d="M18.9091 18.0364L16 19.7818L13.0909 18.0364V14.2545L16 12.5091L18.9091 14.2545V18.0364Z"
				fill="#FAF3EB"
			/>
			<path d="M16 27.0545L7.41818 23.4182L16 32V27.0545Z" fill="#333A4D" />
			<path d="M16 27.0545L24.5818 23.4182L16 32V27.0545Z" fill="#25283B" />
		</svg>
	);
}
