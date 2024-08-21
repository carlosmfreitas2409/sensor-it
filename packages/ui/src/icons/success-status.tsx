import type { Icon } from '.';

export function SuccessStatus(props: Icon) {
	return (
		<svg
			width="56"
			height="56"
			viewBox="0 0 56 56"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<rect width={56} height={56} rx={28} fill="#ECFDF3" />
			<rect x={6} y={6} width={44} height={44} rx={22} fill="#D1FADF" />
			<rect
				x={17}
				y={17}
				width={22}
				height={22}
				rx={11}
				fill="url(#paint0_linear_339_474)"
			/>
			<path
				d="M32.167 25.75l-5.042 5.042-2.291-2.292"
				stroke="#fff"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_339_474"
					x1={28}
					y1={17}
					x2={28}
					y2={39}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#054F31" />
					<stop offset={1} stopColor="#32D583" />
				</linearGradient>
			</defs>
		</svg>
	);
}
