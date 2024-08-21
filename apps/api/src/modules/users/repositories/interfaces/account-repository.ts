import type { Account, InsertAccount } from '@sensor-it/db';

export interface IAccountRepository {
	findByUserIdAndProvider(
		userId: string,
		provider: Account['provider'],
	): Promise<Account | null>;
	create(user: InsertAccount): Promise<Account>;
}
