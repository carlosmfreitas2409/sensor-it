export type IUseCase<E = unknown, R = unknown> = {
	execute(entry: E): Promise<R>;
};
