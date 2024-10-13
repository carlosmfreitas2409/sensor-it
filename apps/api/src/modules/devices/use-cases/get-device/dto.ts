import type { IUseCase } from '@sensor-it/core';

import type { Device } from '@/infra/db';

type GetDeviceInput = {
	organizationId: string;
	deviceId: string;
};

type GetDeviceOutput = Device & { image: string };

type IGetDeviceUseCase = IUseCase<GetDeviceInput, GetDeviceOutput>;

export type { IGetDeviceUseCase, GetDeviceInput, GetDeviceOutput };
