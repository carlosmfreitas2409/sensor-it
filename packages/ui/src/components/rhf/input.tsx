import { Input, type InputProps } from '..';

import { FormControl, useFormField } from '.';

export function FormInput(props: InputProps) {
	const { field } = useFormField();

	return (
		<FormControl>
			<Input {...props} {...field} />
		</FormControl>
	);
}
