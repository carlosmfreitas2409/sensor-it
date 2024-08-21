import { t, type TSchema } from 'elysia';

type IntoStringLiteralUnion<T extends string[]> = Array<
	TSchema & {
		[K in keyof T]: typeof t.Literal<T[K]>;
	}
>;

export function StringLiteralUnion<T extends string[]>(
	values: [...T],
): typeof t.Union<IntoStringLiteralUnion<T>> {
	const literals = values.map((value) => t.Literal(value));
	return t.Union(literals as any);
}
