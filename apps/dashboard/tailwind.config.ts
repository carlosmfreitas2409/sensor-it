import type { Config } from 'tailwindcss';

import sharedConfig from '@sensor-it/ui/tailwind.config';

export default {
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	presets: [sharedConfig],
} satisfies Config;
