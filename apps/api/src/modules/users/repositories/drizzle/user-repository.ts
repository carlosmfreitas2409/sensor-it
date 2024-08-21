import { users, type InsertUser, type User } from '@sensor-it/db';

import { db } from '@/infra/lib/drizzle';

import type { IUserRepository } from '../interfaces/user-repository';

export class DrizzleUserRepository implements IUserRepository {
	public drizzle = db;

	async findById(id: string): Promise<User | null> {
		const user = await this.drizzle.query.users.findFirst({
			where: (fields, { eq }) => eq(fields.id, id),
		});

		if (!user) {
			return null;
		}

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.drizzle.query.users.findFirst({
			where: (fields, { eq }) => eq(fields.email, email),
		});

		if (!user) {
			return null;
		}

		return user;
	}

	async create(dto: InsertUser): Promise<User> {
		const [user] = await this.drizzle.insert(users).values(dto).returning();

		return user;
	}
}
