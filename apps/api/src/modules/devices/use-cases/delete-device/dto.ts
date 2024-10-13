import type { IUseCase } from '@sensor-it/core';

type DeleteDeviceInput = {
	organizationId: string;
	deviceId: string;
};

type IDeleteDeviceUseCase = IUseCase<DeleteDeviceInput, void>;

export type { IDeleteDeviceUseCase, DeleteDeviceInput };
