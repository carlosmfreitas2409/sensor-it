import type { User } from './user';

export type Device = {
	id: string;
	status: 'active' | 'inactive';
	name: string;
	image: string;
	machine: string;
	model: string;
	serialNumber: string;
	assignee: User;
};
