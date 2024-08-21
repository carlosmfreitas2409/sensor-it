import { Checkbox } from '..';

import { FormControl, useFormField } from '.';

export function FormCheckbox(
	props: React.ComponentPropsWithoutRef<typeof Checkbox>,
) {
	const { field } = useFormField();

	const { ref, value, disabled, onChange, onBlur } = field;

	return (
		<FormControl>
			<Checkbox
				ref={ref}
				checked={value}
				onCheckedChange={onChange}
				onBlur={onBlur}
				disabled={disabled}
				{...props}
			/>
		</FormControl>
	);
}
