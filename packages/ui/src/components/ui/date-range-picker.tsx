'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { type Locale, ptBR } from 'date-fns/locale';

import { cn } from '@sensor-it/utils';

import { useMediaQuery } from '../../hooks/use-media-query';

import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	type PopoverContentProps,
} from './popover';
import { Calendar, type DayPickerRangeProps } from './calendar';
import { Command, CommandItem, CommandList } from './command';
import { Button } from './button';

type DateRange = {
	from: Date | undefined;
	to?: Date;
};

type Preset = {
	id: string;
	label: string;
	dateRange: DateRange;
};

type ComponentProps = {
	PopoverContent?: PopoverContentProps;
};

type DateRangePickerProps = Omit<DayPickerRangeProps, 'mode'> & {
	value?: DateRange;
	defaultValue?: DateRange;
	placeholder?: string;
	presets?: Preset[];
	presetId?: string;
	locale?: Locale;
	componentProps?: ComponentProps;
	onValueChange?: (dateRange?: DateRange, preset?: Preset) => void;
};

export function DateRangePicker({
	className,
	value,
	defaultValue,
	placeholder,
	presets,
	presetId,
	locale = ptBR,
	onValueChange,
	componentProps = {},
	...props
}: DateRangePickerProps) {
	const [isOpen, setIsOpen] = useState(false);

	const { isDesktop } = useMediaQuery();

	const [preset, setPreset] = useState<Preset | null>(() => {
		return presets?.find((p) => p.id === presetId) ?? null;
	});

	const [range, setRange] = useState<DateRange | null>(() => {
		return preset?.dateRange ?? value ?? defaultValue ?? null;
	});

	const [month, setMonth] = useState<Date | null>(range?.to ?? null);

	const rangeLabel = useMemo(() => {
		if (!range) return null;

		const from = range.from
			? format(range.from, 'd MMM, yyyy', { locale })
			: '';
		const to = range.to ? format(range.to, 'd MMM, yyyy', { locale }) : '';

		return `${from} - ${to}`;
	}, [locale, range]);

	function onDaySelected(selectedRange?: DateRange, selectedDay?: Date) {
		const newRange =
			range?.from && range?.to ? { from: selectedDay } : selectedRange;

		setRange(newRange || null);
		setPreset(null);

		if (newRange?.from && newRange?.to) {
			onValueChange?.(newRange);
			setIsOpen(false);
		}
	}

	function onPresetSelected(preset: Preset) {
		setRange(preset.dateRange);
		setPreset(preset);

		onValueChange?.(preset.dateRange, preset);
		setIsOpen(false);
	}

	useEffect(() => {
		if (!open) {
			setMonth(range?.to ?? null);
		} else if (range) {
			setMonth(range.to ?? null);
		}
	}, [range]);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" className={cn('group gap-2', className)}>
					<CalendarIcon className="h-4 w-4" />
					<span className="flex-1 truncate text-left font-normal">
						{preset?.label ?? rangeLabel ?? placeholder}
					</span>
					<ChevronDown className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-75 group-data-[state=open]:rotate-180" />
				</Button>
			</PopoverTrigger>

			<PopoverContent
				className={cn('w-auto p-0', componentProps.PopoverContent?.className)}
				{...componentProps.PopoverContent}
			>
				<div className="flex w-full">
					<div className="scrollbar-hide flex w-full flex-col overflow-x-scroll sm:flex-row-reverse sm:items-start">
						{presets && presets.length > 0 && (
							<div
								className={cn(
									'relative flex h-16 w-full items-center sm:h-full sm:w-48',
									'border-gray-200 border-b sm:border-b-0 sm:border-l',
									'scrollbar-hide overflow-auto',
								)}
							>
								<div className="absolute px-3 sm:inset-0 sm:left-0 sm:p-3">
									<Presets presets={presets} onSelect={onPresetSelected} />
								</div>
							</div>
						)}

						<div className="scrollbar-hide overflow-x-scroll">
							<Calendar
								{...props}
								mode="range"
								selected={range || undefined}
								onSelect={onDaySelected}
								month={month || undefined}
								onMonthChange={setMonth}
								locale={locale}
								numberOfMonths={isDesktop ? 2 : 1}
								className="scrollbar-hide overflow-x-scroll"
								classNames={{
									months:
										'flex flex-row divide-x divide-gray-200 overflow-x-scroll scrollbar-hide',
								}}
							/>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}

interface PresetsProps {
	presets: Preset[];
	onSelect: (preset: Preset) => void;
}

function Presets({ presets, onSelect }: PresetsProps) {
	return (
		<Command
			className="w-full rounded ring-gray-200 ring-offset-2 focus:outline-none"
			tabIndex={0}
			autoFocus
			loop
		>
			<CommandList className="[&>*]:flex [&>*]:w-full [&>*]:items-start [&>*]:gap-x-2 [&>*]:gap-y-0.5 [&>*]:sm:flex-col">
				{presets.map((preset, index) => {
					return (
						<CommandItem
							key={index}
							onSelect={() => onSelect(preset)}
							title={preset.label}
							value={preset.id}
							className={cn(
								'group relative flex cursor-pointer items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap rounded border border-gray-200',
								'px-2.5 py-1.5 text-left text-gray-700 text-sm shadow-sm outline-none sm:w-full sm:border-none sm:py-2 sm:shadow-none',
								'disabled:pointer-events-none disabled:opacity-50',
								'sm:data-[selected=true]:bg-gray-100',
								// matchesCurrent(preset) && 'font-semibold text-gray-800',
							)}
						>
							<span>{preset.label}</span>
						</CommandItem>
					);
				})}
			</CommandList>
		</Command>
	);
}
