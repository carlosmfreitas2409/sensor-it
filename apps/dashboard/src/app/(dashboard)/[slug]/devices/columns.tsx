'use client';

import Link from 'next/link';
import type { ColumnDef } from '@tanstack/react-table';

import type { Device } from '@/entities/device';

import { useOrganizationSlug } from '@/hooks/use-organization-slug';

import { ChartColumn } from '@sensor-it/ui/icons';

import { Badge, Button, DataTableColumnHeader } from '@sensor-it/ui/components';

import { ActionsDropdownMenu } from './components/actions-dropdown-menu';

import { statuses } from './mock';

export const columns: ColumnDef<Device>[] = [
	{
		id: 'image',
		enableSorting: false,
		enableHiding: false,
		enableResizing: false,
		size: 40,
		minSize: 40,
		maxSize: 40,
		cell: ({ row }) => {
			return (
				<div className="size-10 rounded-md border bg-background p-1">
					<img src={row.original.image} alt={row.original.model} />
				</div>
			);
		},
	},
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} enableSorting>
				Nome do dispositivo
			</DataTableColumnHeader>
		),
	},
	{
		accessorKey: 'model',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} enableSorting>
				Modelo
			</DataTableColumnHeader>
		),
	},
	{
		accessorKey: 'status',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} enableSorting>
				Estado
			</DataTableColumnHeader>
		),
		cell: ({ row }) => {
			const { label, variant } = statuses[row.original.status];

			return <Badge variant={variant}>{label}</Badge>;
		},
	},
	{
		accessorKey: 'machine',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} enableSorting>
				Máquina
			</DataTableColumnHeader>
		),
	},
	{
		accessorKey: 'assignee.name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} enableSorting>
				Responsável
			</DataTableColumnHeader>
		),
	},
	{
		id: 'actions',
		enableHiding: false,
		size: 92,
		cell: ({ row }) => {
			const slug = useOrganizationSlug();

			const deviceId = row.original.id;

			return (
				<div className="flex items-center gap-1">
					<Button variant="ghost" size="icon" className="size-8" asChild>
						<Link href={`/${slug}/devices/${deviceId}`}>
							<ChartColumn className="size-4" />
						</Link>
					</Button>

					<ActionsDropdownMenu deviceId={deviceId} />
				</div>
			);
		},
	},
];
