import type { deviceModelEnum } from '@/infra/db';

type Model = (typeof deviceModelEnum.enumValues)[number];
type Config = { image: string };

type DeviceModel = Record<Model, Config>;

export const deviceModelsConfig: DeviceModel = {
	TriS: {
		image:
			'https://www.winmate.com/upload/Product/L4/Product-EACFA20-45-L4-I.png',
	},
};
