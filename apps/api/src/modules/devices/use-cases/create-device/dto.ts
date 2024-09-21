import type { IUseCase } from '@sensor-it/core';

import type { deviceModelEnum } from '@/infra/db';

type CreateDeviceInput = {
	organizationId: string;
	name: string;
	machine: string;
	assigneeId: string;
	model: (typeof deviceModelEnum.enumValues)[number];
	serialNumber: string;
};

type ICreateDeviceUseCase = IUseCase<CreateDeviceInput, void>;

export type { ICreateDeviceUseCase, CreateDeviceInput };
