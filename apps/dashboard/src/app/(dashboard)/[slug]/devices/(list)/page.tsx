import Link from 'next/link';

import { getOrganizationSlug } from '@/lib/auth';

import { LayoutGrid, LayoutList, Plus } from '@sensor-it/ui/icons';

import {
	Button,
	DataTable,
	Input,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@sensor-it/ui/components';

import { DeviceCard } from './components/device-card';

import { columns } from './columns';
import { listDevices } from '@/services/devices/list-devices';

export default async function Devices() {
	const slug = getOrganizationSlug();

	if (!slug) return null;

	const devices = await listDevices(slug);

	return (
		<Tabs className="flex flex-1 flex-col gap-4" defaultValue="grid">
			<div className="flex items-center justify-between gap-6">
				<h1 className="font-bold text-2xl">Dispositivos</h1>

				<div className="flex gap-3">
					<Input placeholder="Buscar..." className="h-9 w-56" />

					<TabsList className="h-9">
						<TabsTrigger value="grid">
							<LayoutGrid className="size-4" />
						</TabsTrigger>

						<TabsTrigger value="list">
							<LayoutList className="size-4" />
						</TabsTrigger>
					</TabsList>

					<Button size="sm" asChild>
						<Link href={`/${slug}/devices/create`}>
							<Plus className="mr-2 size-4" />
							<span>Novo dispositivo</span>
						</Link>
					</Button>
				</div>
			</div>

			<TabsContent value="list">
				<DataTable data={devices} columns={columns} />
			</TabsContent>

			<TabsContent value="grid" className="grid grid-cols-3 gap-4">
				{devices.map((device) => (
					<DeviceCard key={device.id} device={device} />
				))}
			</TabsContent>
		</Tabs>
	);
}
