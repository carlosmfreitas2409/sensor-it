import { z } from 'zod';

enum Step {
	CHANGE_PLATFORM = 0,
	SMARTPHONE_AUTHENTICATION = 1,
	CONNECT_DEVICE = 2,
	SETUP_NETWORK = 3,
	SETUP_DEVICE = 4,
}

const createDeviceSchema = z.object({
	step: z.nativeEnum(Step),
	name: z.string().min(1),
	machine: z.string().min(1),
	assigneeId: z.string().min(1),
	model: z.string().min(1),
	serialNumber: z.string().min(1),
});

type CreateDeviceFormData = z.infer<typeof createDeviceSchema>;

export { createDeviceSchema, Step };
export type { CreateDeviceFormData };
