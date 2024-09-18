import type { InsertUser, User } from '@/infra/db';

export interface IUserRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	create(user: InsertUser): Promise<User>;
}
