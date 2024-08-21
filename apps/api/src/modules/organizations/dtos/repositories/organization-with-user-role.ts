import type { roleSchema } from '@sensor-it/auth';

export type OrganizationWithUserRole = {
	id: string;
	name: string;
	slug: string;
	avatarUrl: string | null;
	role: (typeof roleSchema.options)[number];
};
