export type Query<R> = () => Promise<R>;

export interface IUnitOfWork {
	runInTransaction<R>(fn: Query<R>): Promise<R>;
}
