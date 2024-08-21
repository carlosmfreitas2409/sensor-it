import { Select, SelectContent, SelectTrigger, SelectValue } from '..';

import { FormControl, useFormField } from '.';

export function FormSelect({
	children,
	...props
}: React.ComponentPropsWithoutRef<typeof SelectValue>) {
	const { field } = useFormField();

	return (
		<FormControl>
			<Select
				onValueChange={field.onChange}
				defaultValue={field.value}
				disabled={field.disabled}
			>
				<SelectTrigger>
					<SelectValue {...props} />
				</SelectTrigger>
				<SelectContent>{children}</SelectContent>
			</Select>
		</FormControl>
	);
}
