import { Calendar } from "primereact/calendar";
import { dateFormatShortCalendar } from "@/config/constants";

interface DatePickerProps {
	inputId?: string;
	name?: string;
	value?: Date | string;
	invalid?: boolean;
	className?: string;
	disabled?: boolean;
	placeholder?: string;
	maxDate?: Date;
	minDate?: Date;
	view?: "date" | "month" | "year";
	dateFormat?: string;
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
	maxDate,
	minDate,
	view = "date",
	dateFormat,
	onChange,
}: DatePickerProps): JSX.Element => {
	return (
		<Calendar
			inputId={inputId}
			value={value}
			name={name}
			disabled={disabled}
			placeholder={placeholder}
			maxDate={maxDate}
			minDate={minDate}
			view={view}
			selectOtherMonths={true}
			className={`${className} [&>*]:shadow-none
        ${invalid ? "[&>*]:border-red-ERROR " : ""}
      `}
			onChange={(event): void => {
				const date = event.target.value as Date;
				onChange && onChange(date);
			}}
			dateFormat={dateFormat ?? dateFormatShortCalendar}
			locale="en"
		/>
	);
};
