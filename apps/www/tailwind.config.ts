import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				xl: '1088px',
				lg: '1088px',
			},
		},
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				border: 'hsl(var(--border))',
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					foreground: 'hsl(var(--muted-foreground))',
				},
			},
			animation: {
				heroFadeIn: 'fadeIn 2s 2s both',
				titleFlick: 'flick .24s steps(1) .3s 4 both, colorFade .6s .5s both',
				versionPulse: 'pulse .8s .7s both',
				descFlick: 'flick .24s steps(1) 1.2s 4 both',
				footerFadeIn: 'fadeIn .5s 3s both',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				flick: {
					'0%': { opacity: '0' },
					'50%, 100%': { opacity: '1' },
				},
				colorFade: {
					'0%': { color: 'hsl(var(--secondary))' },
					'100%': { color: 'hsl(var(--foreground))' },
				},
				pulse: {
					'0%, 30%, 70%': { opacity: '0' },
					'20%, 60%': { opacity: '.3' },
					'100%': { opacity: '1' },
				},
			},
		},
	},
	plugins: [],
};
export default config;
