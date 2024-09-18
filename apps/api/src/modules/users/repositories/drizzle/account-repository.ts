import { db, accounts, type InsertAccount, type Account } from '@/infra/db';

import type { IAccountRepository } from '../interfaces/account-repository';

export class DrizzleAccountRepository implements IAccountRepository {
	public drizzle = db;

	async findByUserIdAndProvider(
		userId: string,
		provider: Account['provider'],
	): Promise<Account | null> {
		const account = await this.drizzle.query.accounts.findFirst({
			where: (fields, { and, eq }) =>
				and(eq(fields.userId, userId), eq(fields.provider, provider)),
		});

		if (!account) {
			return null;
		}

		return account;
	}

	async create(dto: InsertAccount): Promise<Account> {
		const [account] = await this.drizzle
			.insert(accounts)
			.values(dto)
			.returning();

		return account;
	}
}
