import Elysia from 'elysia';

import { createDeviceController } from '../use-cases/create-device/controller';
import { listDevicesController } from '../use-cases/list-devices/controller';

export const devicesRoutes = new Elysia()
	.use(listDevicesController)
	.use(createDeviceController);
