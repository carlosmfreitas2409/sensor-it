import { MetaMark, OpenAIMark } from '@sensor-it/ui/icons';

export interface Company {
	name: string;
	logo: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface Model {
	name: string;
	company: Company;
	description: string;
	isPro: boolean;
	tokens: number;
	entryPrice: number;
	exitPrice: number;
}

export const models: Model[] = [
	{
		name: 'gpt-4o',
		description:
			'O GPT-4o da OpenAI tem amplo conhecimento geral e expertise de domínio, permitindo que ele siga instruções complexas em linguagem natural e resolva problemas difíceis com precisão. Ele combina o desempenho do GPT-4 Turbo com uma API mais rápida e barata.',
		company: {
			name: 'OpenAI',
			logo: OpenAIMark,
		},
		isPro: true,
		tokens: 128000,
		entryPrice: 5,
		exitPrice: 15,
	},
	{
		name: 'gpt-3.5-turbo',
		description:
			'O modelo mais capaz e econômico da OpenAI na família GPT-3.5 é otimizado para fins de bate-papo, mas também funciona bem para tarefas de conclusão tradicionais.',
		company: {
			name: 'OpenAI',
			logo: OpenAIMark,
		},
		isPro: false,
		tokens: 4096,
		entryPrice: 1.5,
		exitPrice: 2,
	},
	{
		name: 'llama-3.2-1b',
		description:
			'O modelo Llama 3.2 1B é feito pela Meta e servido pela Groq em seu hardware LPU. Ele é leve e pode ser executado em qualquer lugar em dispositivos móveis e de ponta.',
		company: {
			name: 'Meta',
			logo: MetaMark,
		},
		isPro: true,
		tokens: 128000,
		entryPrice: 0.7,
		exitPrice: 0.8,
	},
];
