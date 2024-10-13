'use client';

import { useState } from 'react';

import { cn } from '@sensor-it/utils';

import { CheckIcon, ChevronDown } from '@sensor-it/ui/icons';

import {
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	HoverCard,
	HoverCardContent,
	Badge,
	HoverCardTrigger,
} from '@sensor-it/ui/components';

import { type Model, models } from '../mock';

const DEFAULT_MODEL = models[0] as Model;

export function ModelSelector() {
	const [open, setOpen] = useState(false);

	const [selectedModel, setSelectedModel] = useState<Model>(DEFAULT_MODEL);
	const [peekedModel, setPeekedModel] = useState<Model>(DEFAULT_MODEL);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					aria-label="Selecione um modelo"
					className="w-full justify-between"
				>
					<ModelItem model={selectedModel} />
					<ChevronDown className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
				</Button>
			</PopoverTrigger>

			<PopoverContent
				align="start"
				className="w-[var(--radix-popover-trigger-width)] p-0"
			>
				<HoverCard>
					<Command loop>
						<HoverCardTrigger className="block w-full" />

						<CommandList className="max-h-[400px]">
							<CommandInput
								placeholder="Buscar modelos..."
								className="h-10 px-1"
							/>

							<CommandEmpty>Nenhum modelo encontrado.</CommandEmpty>

							<CommandGroup>
								{models.map((model, index) => {
									const isSelected = selectedModel?.name === model.name;

									return (
										<CommandItem
											key={index}
											onSelect={() => {
												setSelectedModel(model);
												setOpen(false);
											}}
											onMouseEnter={() => {
												setPeekedModel(model);
											}}
										>
											<ModelItem model={model} />

											<CheckIcon
												className={cn(
													'ml-auto h-4 w-4',
													isSelected ? 'opacity-100' : 'opacity-0',
												)}
											/>
										</CommandItem>
									);
								})}
							</CommandGroup>
						</CommandList>
					</Command>

					<HoverCardContent
						side="right"
						align="start"
						forceMount
						className="min-w-[320px]"
					>
						<ModelDetails model={peekedModel} />
					</HoverCardContent>
				</HoverCard>
			</PopoverContent>
		</Popover>
	);
}

function ModelItem({ model }: { model: Model }) {
	const Logo = model.company.logo;

	return (
		<span className="inline-flex items-center gap-2 py-0.5 text-xs">
			<Logo className="h-4 w-4" />
			<span>{model.name}</span>

			{model.isPro && <Badge className="h-4 px-1.5 text-[.625rem]">Pro</Badge>}
		</span>
	);
}

function ModelDetails({ model }: { model: Model }) {
	const Logo = model.company.logo;

	const tokens = model.tokens.toLocaleString('en-US', {
		style: 'decimal',
		maximumFractionDigits: 0,
	});

	const priceFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 2,
	});

	const entryPrice = priceFormatter.format(model.entryPrice);
	const exitPrice = priceFormatter.format(model.exitPrice);

	return (
		<div>
			<div className="flex items-center">
				<Logo className="mr-2 h-4 w-4" />

				<div className="space-x-1 text-sm">
					<span className="text-muted-foreground">{model.company.name}</span>
					<span className="text-muted-foreground">/</span>
					<span className="font-medium">{model.name}</span>
				</div>
			</div>

			<p className="mt-3 text-muted-foreground text-xs">{model.description}</p>

			<div className="mt-2 divide-y">
				<div className="flex py-3 text-[.5rem]">
					<span className="w-28 font-medium text-muted-foreground text-xs">
						Contexto
					</span>
					<span className="flex-1 text-xs">{tokens} tokens</span>
				</div>

				<div className="flex py-3 text-[.5rem]">
					<span className="w-28 font-medium text-muted-foreground text-xs">
						Preço de entrada
					</span>
					<span className="flex-1 text-xs">
						{entryPrice} / milhões de tokens
					</span>
				</div>

				<div className="flex py-3 text-[.5rem]">
					<span className="w-28 font-medium text-muted-foreground text-xs">
						Preço de saída
					</span>
					<span className="flex-1 text-xs">
						{exitPrice} / milhões de tokens
					</span>
				</div>
			</div>
		</div>
	);
}
