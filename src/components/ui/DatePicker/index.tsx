import { type FC, useState } from "react";

import { Calendar } from "primereact/calendar";
import type { Nullable } from "primereact/ts-helpers";
import { dateFormatShort, dateFormatShortCalendar } from "@/config/constants";

interface DatePickerProps {
	inputId?: string;
	name?: string;
	value?: Date;
	invalid?: boolean;
	className?: string;
	disabled?: boolean;
	placeholder?: string;
	onChange?: (event: Date) => void;
}

export const DatePicker = ({
	inputId,
	name,
	value,
	invalid = false,
	className,
	placeholder,
	disabled,
	onChange,
}: DatePickerProps): JSX.Element => {
	return (
		<Calendar
			inputId={inputId}
			value={value}
			name={name}
			disabled={disabled}
			placeholder={placeholder}
			className={`${className}
        h-12 rounded-none [&>*]:rounded-none [&>*]:border-gold-500  [&>*]:border-2
        ${invalid ? "[&>*]:border-red-ERROR " : ""}
      `}
			onChange={(event): void => {
				const date = event.target.value as Date;
				onChange && onChange(date);
			}}
			dateFormat={dateFormatShortCalendar}
			locale="en"
		/>
	);
};
