'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, isSameMonth } from 'date-fns';
import {
	DayPicker,
	useDayPicker,
	useDayRender,
	useNavigation,
	type DayPickerRangeProps,
	type DayProps,
	type Matcher,
} from 'react-day-picker';

import { cn } from '@sensor-it/utils';

import { Button } from './button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
	weekStartsOn = 1,
	numberOfMonths = 1,
	locale,
	className,
	classNames,
	...props
}: CalendarProps) {
	return (
		<DayPicker
			weekStartsOn={weekStartsOn}
			numberOfMonths={numberOfMonths}
			locale={locale}
			showOutsideDays={numberOfMonths === 1}
			className={className}
			classNames={{
				months: 'flex space-y-0',
				month: 'space-y-4 p-3 w-full',
				nav: 'gap-1 flex items-center rounded-full w-full h-full justify-between p-4',
				table: 'w-full border-separate border-spacing-y-1',
				head_cell: 'w-9 font-medium text-xs text-center text-gray-400 pb-2',
				row: 'w-full',
				cell: 'relative p-0 text-center focus-within:relative text-gray-900',
				day: cn(
					'relative h-10 w-full sm:h-9 sm:w-9 rounded-md text-sm text-gray-900',
					'hover:bg-gray-100 active:bg-gray-200 outline outline-offset-2 outline-0 focus-visible:outline-2 outline-blue-500',
				),
				day_today: 'font-semibold',
				day_selected:
					'rounded aria-selected:bg-blue-500 aria-selected:text-white',
				day_disabled:
					'!text-gray-300 line-through disabled:hover:bg-transparent',
				day_outside: 'text-gray-400',
				day_range_middle:
					'!rounded-none aria-selected:!bg-blue-100 aria-selected:!text-blue-900',
				day_range_start: 'rounded-r-none !rounded-l',
				day_range_end: 'rounded-l-none !rounded-r',
				day_hidden: 'invisible',
				...classNames,
			}}
			components={{
				IconLeft: () => <ChevronLeft className="h-4 w-4" />,
				IconRight: () => <ChevronRight className="h-4 w-4" />,
				Caption: ({ ...props }) => {
					const { goToMonth, nextMonth, previousMonth, displayMonths } =
						useNavigation();

					const { numberOfMonths } = useDayPicker();

					const displayIndex = displayMonths.findIndex((month) =>
						isSameMonth(props.displayMonth, month),
					);
					const isFirst = displayIndex === 0;
					const isLast = displayIndex === displayMonths.length - 1;

					const hideNextButton = numberOfMonths > 1 && (isFirst || !isLast);
					const hidePreviousButton = numberOfMonths > 1 && (isLast || !isFirst);

					return (
						<div className="flex items-center justify-between">
							<div>
								{!hidePreviousButton && (
									<Button
										variant="outline"
										size="icon"
										className="size-7 p-1"
										disabled={!previousMonth}
										aria-label="Ir para o mês anterior"
										onClick={() => previousMonth && goToMonth(previousMonth)}
									>
										<ChevronLeft className="h-full w-full text-muted-foreground" />
									</Button>
								)}
							</div>

							<div
								role="presentation"
								aria-live="polite"
								className="font-medium text-gray-900 text-sm capitalize tabular-nums"
							>
								{format(props.displayMonth, 'LLLL yyy', { locale })}
							</div>

							<div>
								{!hideNextButton && (
									<Button
										variant="outline"
										size="icon"
										className="size-7 p-1"
										disabled={!nextMonth}
										aria-label="Ir para o próximo mês"
										onClick={() => nextMonth && goToMonth(nextMonth)}
									>
										<ChevronRight className="h-full w-full text-muted-foreground" />
									</Button>
								)}
							</div>
						</div>
					);
				},
				Day: ({ date, displayMonth }: DayProps) => {
					const buttonRef = React.useRef<HTMLButtonElement>(null);
					const { activeModifiers, buttonProps, divProps, isButton, isHidden } =
						useDayRender(date, displayMonth, buttonRef);

					const { selected, today, disabled, range_middle } = activeModifiers;

					if (isHidden) return <></>;

					if (!isButton) {
						return (
							<div
								{...divProps}
								className={cn(
									'flex items-center justify-center',
									divProps.className,
								)}
							/>
						);
					}

					const { children: buttonChildren, ...buttonPropsRest } = buttonProps;

					return (
						<button ref={buttonRef} {...buttonPropsRest} type="button">
							{buttonChildren}
							{today && (
								<span
									className={cn(
										'-translate-x-1/2 absolute inset-x-1/2 bottom-1.5 h-0.5 w-4 rounded-[2px]',
										{
											'bg-blue-500': !selected,
											'!bg-white': selected,
											'!bg-blue-400': selected && range_middle,
											'text-gray-400': disabled,
										},
									)}
								/>
							)}
						</button>
					);
				},
			}}
			{...props}
		/>
	);
}

export { Calendar, type Matcher, type DayPickerRangeProps };
