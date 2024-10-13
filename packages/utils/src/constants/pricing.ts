export type Plan = (typeof PLANS)[number];

export const PLANS = [
	{
		key: 'free',
		name: 'Gratuito',
		tagline: 'Para quem está começando',
		price: {
			monthly: 0,
			yearly: 0,
		},
		limits: {
			devices: 2,
			captures: 1000,
			users: 1,
			ai: 10,
		},
		features: [
			'2 novos dispositivos/mês',
			'1000 capturas/mês',
			'30 dias de retenção de capturas',
			'1 usuário',
			'Métricas avançadas',
			'10 créditos de IA/mês',
			'Suporte básico',
		],
	},
	{
		key: 'pro',
		name: 'Pro',
		tagline: 'Para startups e pequenas empresas',
		price: {
			monthly: 120,
			yearly: 1200,
			// ids: ['price_1Q4uIgCs1UH9gRCjOayyleeU', 'price_1Q4uJECs1UH9gRCj15OywL3y'],
		},
		limits: {
			devices: 50,
			captures: 50000,
			users: 5,
			ai: 1000,
		},
		features: [
			'50 novos dispositivos/mês',
			'50.000 capturas/mês',
			'1 ano de retenção de capturas',
			'5 usuários',
			'Métricas avançadas',
			'Créditos de IA ilimitados',
			'Suporte prioritário',
		],
	},
	{
		key: 'business',
		name: 'Business',
		tagline: 'Para empresas maiores com maior uso',
		price: {
			monthly: 300,
			yearly: 3000,
			// ids: ['price_1Q4uJZCs1UH9gRCjICmBR19Y', 'price_1Q4uK4Cs1UH9gRCjxWRCBMSG'],
		},
		limits: {
			devices: 200,
			captures: 200000,
			users: 15,
			ai: 1000,
		},
		features: [
			'200 novos dispositivos/mês',
			'200.000 capturas/mês',
			'3 anos de retenção de capturas',
			'15 usuários',
			'Capturas em tempo real',
		],
	},
];

export const FREE_PLAN = PLANS.find((plan) => plan.name === 'Free') as Plan;
export const PRO_PLAN = PLANS.find((plan) => plan.name === 'Pro') as Plan;
export const BUSINESS_PLAN = PLANS.find(
	(plan) => plan.name === 'Business',
) as Plan;
