import type { Config } from 'tailwindcss';

import sharedConfig from '@sensor-it/ui/tailwind.config';

export default {
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	presets: [sharedConfig],
	theme: {
		extend: {
			screens: {
				sm: '600px',
				xl: '1200px',
				'2xl': '1536px',
			},
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1.5rem',
				md: '2.5rem',
				xl: '2.5rem',
			},
			screens: {
				sm: '100%',
				md: '1200px',
				xl: '1536px',
			},
		},
	},
} satisfies Config;
