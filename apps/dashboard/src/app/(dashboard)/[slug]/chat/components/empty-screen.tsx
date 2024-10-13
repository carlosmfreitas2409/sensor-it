import {
	AlignLeft,
	Circle,
	SensorItMark,
	TriangleAlert,
} from '@sensor-it/ui/icons';

import { InfoCard } from './info-card';

export function EmptyScreen() {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="flex max-w-3xl flex-col items-center gap-10 px-4">
				<div className="flex max-w-sm flex-col items-center">
					<div className="flex size-16 items-center justify-center rounded-md border bg-white">
						<SensorItMark className="size-11" variant="green" />
					</div>

					<h1 className="mt-6 font-bold text-2xl">Bem-vindo ao SensorChat!</h1>
					<p className="mt-2 text-center text-muted-foreground text-sm">
						O SensorChat é seu assistente pessoal com IA, pronto para ajudá-lo a
						navegar pelo seu maquinário e fornecer informações valiosas.
					</p>
				</div>

				<div className="grid w-full grid-cols-3 gap-4">
					<InfoCard
						title="Exemplos"
						icon={Circle}
						messages={[
							'"Me dê um relatório da produção do dia 06/01/2023.”',
							'”Tem alguma máquina que está precisando de manutenção?"',
							'"Faça uma comparação da produção entre a máquina de corte de prasma e a de laser."',
						]}
					/>

					<InfoCard
						title="Capacidades"
						icon={AlignLeft}
						messages={[
							'Suporta correções fornecidas pelo usuário.',
							'Programado para rejeitar solicitações inadequadas.',
							'Retém as entradas anteriores do usuário durante a conversa em andamento.',
						]}
					/>

					<InfoCard
						title="Limitações"
						icon={TriangleAlert}
						messages={[
							'Pode, às vezes, produzir dados imprecisos ou errôneos.',
							'Pode, às vezes, criar conteúdo prejudicial ou tendencioso.',
							'Possui conhecimento limitado de alguns eventos e bloqueamos conteúdo fora do assunto.',
						]}
					/>
				</div>
			</div>
		</div>
	);
}
