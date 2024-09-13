export type ColumnBuilderBaseConfig<TColumnType> = {
	name: string;
	columnType: TColumnType;
	data: unknown;
};

export type ChColumnBuilderBase<
	T extends ColumnBuilderBaseConfig<unknown> = ColumnBuilderBaseConfig<string>,
> = T;

type ChText = ChColumnBuilderBase<{
	name: string;
	columnType: 'String';
	data: string;
}>;

type ChInt = ChColumnBuilderBase<{
	name: string;
	columnType: 'UInt32';
	data: number;
}>;

type ChUUID = ChColumnBuilderBase<{
	name: string;
	columnType: 'UUID';
	data: string;
}>;

type ChDateTime = ChColumnBuilderBase<{
	name: string;
	columnType: 'DateTime';
	data: Date;
}>;

type ChEnum<TValues extends string[]> = ChColumnBuilderBase<{
	name: string;
	columnType: 'Enum';
	data: TValues[number];
}> & {
	enumValues: TValues;
};

export function text(name: string): ChText {
	return {
		name,
		columnType: 'String',
		data: '',
	};
}

export function int(name: string): ChInt {
	return {
		name,
		columnType: 'UInt32',
		data: 0,
	};
}

export function uuid(name: string): ChUUID {
	return {
		name,
		columnType: 'UUID',
		data: '',
	};
}

export function dateTime(name: string): ChDateTime {
	return {
		name,
		columnType: 'DateTime',
		data: new Date(),
	};
}

export function chEnum<U extends string, TValues extends [U, ...U[]]>(
	name: string,
	values: TValues,
): ChEnum<TValues> {
	return {
		name,
		columnType: 'Enum',
		data: values[0],
		enumValues: values,
	};
}
