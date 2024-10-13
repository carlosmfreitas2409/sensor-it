import Elysia from 'elysia';

import { createDeviceController } from '../use-cases/create-device/controller';
import { getDeviceController } from '../use-cases/get-device/controller';
import { listDevicesController } from '../use-cases/list-devices/controller';
import { deleteDeviceController } from '../use-cases/delete-device/controller';

export const devicesRoutes = new Elysia()
	.use(listDevicesController)
	.use(getDeviceController)
	.use(createDeviceController)
	.use(deleteDeviceController);
