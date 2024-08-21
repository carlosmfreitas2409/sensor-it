'use client';

import { useState } from 'react';
import {
	type Column,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type SortingState,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './table';
import { Button } from './button';
import { ArrowUpDown } from 'lucide-react';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		state: {
			sorting,
		},
	});

	return (
		<div className="overflow-hidden rounded-md border">
			<Table className="table-fixed">
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										style={{
											width: header.getSize(),
											minWidth: header.column.columnDef.minSize,
											maxWidth: header.column.columnDef.maxSize,
										}}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>

				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}

interface DataTableColumnHeaderProps<TData>
	extends React.ComponentProps<typeof Button> {
	column?: Column<TData, unknown>;
	enableSorting?: boolean;
}

function DataTableColumnHeader<TData>({
	column,
	enableSorting = false,
	children,
	...props
}: DataTableColumnHeaderProps<TData>) {
	function onClickHeader() {
		if (!column) return;

		if (enableSorting) {
			return column.toggleSorting(column.getIsSorted() === 'asc');
		}
	}

	return (
		<div className="flex items-center gap-1">
			<span>{children}</span>

			<Button
				size="icon"
				variant="ghost"
				className="size-6"
				onClick={onClickHeader}
				{...props}
			>
				<ArrowUpDown className="size-3 text-muted-foreground" />
			</Button>
		</div>
	);
}

export { DataTable, DataTableColumnHeader };
