import type { IUseCase } from '@sensor-it/core';

import type { Device } from '@/infra/db';

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
