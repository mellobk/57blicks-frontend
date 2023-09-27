import { FC, InputHTMLAttributes, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { formatPlaceholder, formatValue } from "@/utils/formats.ts";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	control: Control<any>;
	error?: string;
	format: "money" | "percentage";
	name: string;
}

export const FormatInput: FC<Props> = ({
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
					className={`h-full w-full py-3 px-4 bg-white ${
						error ? "border-2 border-red-ERROR" : ""
					} hover:bg-gray-200 focus-visible:border-gold-500 focus-visible:border-2 focus-visible:outline-none`}
					min={0}
					onBlur={() => {
						setIsEditing(false);
						onBlur();
					}}
					onChange={(e) => {
						let inputValue = e.target.value;

						if (inputValue !== "") {
							inputValue = Number(inputValue).toString();
						}

						onChange(inputValue);
					}}
					onFocus={() => setIsEditing(true)}
					placeholder={formatPlaceholder(format, placeholder)}
					type={isEditing ? "number" : "text"}
					value={
						isEditing ? String(value) : value ? formatValue(value, format) : ""
					}
					{...props}
				/>
			)}
		/>
	);
};
