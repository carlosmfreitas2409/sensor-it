import { getOrganizationSlug } from '@/lib/auth';

import { listDevices } from '@/services/devices/list-devices';

import { LayoutGrid, LayoutList, Plus } from '@sensor-it/ui/icons';

import {
	Button,
	DataTable,
	Dialog,
	DialogContent,
	DialogTrigger,
	MaxWidthWrapper,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@sensor-it/ui/components';

import { DeviceProvider } from './components/create-device/device-provider';
import { CreateDeviceForm } from './components/create-device/create-device-form';

import { DeviceCard } from './components/device-card';
import { EmptyState } from './components/empty-state';

import { columns } from './columns';

export default async function Devices() {
	const slug = getOrganizationSlug();

	if (!slug) return null;

	const devices = await listDevices(slug);

	return (
		<MaxWidthWrapper>
			<Tabs className="flex flex-1 flex-col gap-4" defaultValue="grid">
				<div className="flex items-center justify-between gap-6">
					<h1 className="font-bold text-2xl">Dispositivos</h1>

					<div className="flex gap-3">
						<TabsList className="h-9">
							<TabsTrigger value="grid">
								<LayoutGrid className="size-4" />
							</TabsTrigger>

							<TabsTrigger value="list">
								<LayoutList className="size-4" />
							</TabsTrigger>
						</TabsList>

						<Dialog>
							<DialogTrigger asChild>
								<Button size="sm">
									<Plus className="mr-2 size-4" />
									<span>Novo dispositivo</span>
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DeviceProvider>
									<CreateDeviceForm />
								</DeviceProvider>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				<TabsContent value="list">
					<DataTable data={devices} columns={columns} />
				</TabsContent>

				<TabsContent value="grid">
					<div className="grid grid-cols-3 gap-4">
						{devices.map((device) => (
							<DeviceCard key={device.id} device={device} />
						))}
					</div>

					{devices.length <= 0 && <EmptyState />}
				</TabsContent>
			</Tabs>
		</MaxWidthWrapper>
	);
}
