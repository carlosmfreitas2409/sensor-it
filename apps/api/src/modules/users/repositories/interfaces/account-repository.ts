import type { Account, InsertAccount } from '@/infra/db';

export interface IAccountRepository {
	findByUserIdAndProvider(
		userId: string,
		provider: Account['provider'],
	): Promise<Account | null>;
	create(user: InsertAccount): Promise<Account>;
}
