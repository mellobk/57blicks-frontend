import { type FC, type InputHTMLAttributes, useState } from "react";
import { type Control, Controller } from "react-hook-form";
import { dateFormatFormat } from "@/utils/formats.ts";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	control: Control<any>;
	error?: string;
	format?: "date" | "text";
	name: string;
}

export const CellInputDate: FC<Props> = ({
	control,
	error,
	format,
	name,
	placeholder,
	...props
}) => {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur, value } }) => (
				<input
					className={`h-full w-full py-3 px-4 bg-transparent ${
						error ? "border-2 border-red-ERROR" : ""
					} hover:bg-gray-200 focus-visible:border-gold-500 focus-visible:border-2 focus-visible:outline-none items-center font-inter text-[13px] text-primary-300 leading-4 tracking-[-0.65px]`}
					min={0}
					onBlur={() => {
						setIsEditing(false);
						onBlur();
					}}
					onChange={(e) => {
						const inputValue = e.target.value;

						onChange(inputValue);
					}}
					onFocus={() => {
						setIsEditing(true);
					}}
					placeholder={placeholder}
					type={isEditing ? (format === "date" ? "number" : "text") : "text"}
					value={
						isEditing
							? (value as string) || ""
							: value || ""
							? format === "date"
								? dateFormatFormat(value as string)
								: (value as string)
							: (value as string) || ""
					}
					{...props}
				/>
			)}
		/>
	);
};
