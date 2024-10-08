import type { Device } from '@sensor-it/db';

import type { IUseCase } from '@/core/infra/use-case';

type ListDevicesInput = {
	organizationId: string;
};

type ListDevicesOutput = Array<
	Device & {
		image: string;
	}
>;

type IListDevicesUseCase = IUseCase<ListDevicesInput, ListDevicesOutput>;

export type { IListDevicesUseCase, ListDevicesInput, ListDevicesOutput };
