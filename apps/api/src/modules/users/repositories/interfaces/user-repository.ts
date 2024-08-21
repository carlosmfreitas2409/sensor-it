import type { InsertUser, User } from '@sensor-it/db';

export interface IUserRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	create(user: InsertUser): Promise<User>;
}
