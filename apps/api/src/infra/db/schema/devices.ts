import {
	relations,
	type InferInsertModel,
	type InferSelectModel,
} from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { users } from './users';
import { organizations } from './organizations';

export type Device = InferSelectModel<typeof devices>;
export type InsertDevice = InferInsertModel<typeof devices>;

export const deviceModelEnum = pgEnum('device_model', ['TriS']);
export const deviceStatusEnum = pgEnum('device_status', ['active', 'inactive']);

export const devices = pgTable('devices', {
	id: uuid('id').defaultRandom().primaryKey(),
	organizationId: uuid('organization_id')
		.notNull()
		.references(() => organizations.id, { onDelete: 'cascade' }),
	status: deviceStatusEnum('status').notNull().default('active'),
	name: text('name').notNull(),
	machine: text('machine').notNull(),
	assigneeId: uuid('assignee_id')
		.notNull()
		.references(() => users.id, { onDelete: 'set null' }),
	model: deviceModelEnum('model').notNull(),
	serialNumber: text('serial_number').unique().notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const devicesRelations = relations(devices, ({ one }) => ({
	assignee: one(users, {
		fields: [devices.assigneeId],
		references: [users.id],
		relationName: 'device_assignee',
	}),
}));
