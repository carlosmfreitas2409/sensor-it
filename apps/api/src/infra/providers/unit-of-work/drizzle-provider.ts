import { db, type IDatabaseConnection } from '@/infra/lib/drizzle';

import type { IUnitOfWork, Query } from './model';

type Repository = { drizzle: IDatabaseConnection };

export class DrizzleUnitOfWork implements IUnitOfWork {
	private repositories: Repository[];

	constructor(repositories: Repository[]) {
		this.repositories = repositories;
	}

	async runInTransaction<R>(fn: Query<R>): Promise<R> {
		return db.transaction(async (tx) => {
			for (const repository of this.repositories) {
				repository.drizzle = tx;
			}

			const result = await fn();

			for (const repository of this.repositories) {
				repository.drizzle = db;
			}

			return result;
		});
	}
}
