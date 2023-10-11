import { type Control, Controller } from "react-hook-form";
import { type FC, type InputHTMLAttributes, useState } from "react";
import { formatPlaceholder, formatValue } from "@/utils/formats.ts";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	control: Control<any>;
	error?: string;
	format: "money" | "percentage";
	name: string;
}

export const CellInput: FC<Props> = ({
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
					onBlur={(): void => {
						setIsEditing(false);
						onBlur();
					}}
					onChange={(event): void => {
						let inputValue = event.target.value;

						if (inputValue !== "") {
							inputValue = Number(inputValue).toString();
						}

						onChange(inputValue);
					}}
					onFocus={(): void => {
						setIsEditing(true);
					}}
					placeholder={formatPlaceholder(format, placeholder)}
					type={isEditing ? "number" : "text"}
					value={
						isEditing
							? String(value)
							: value
							? formatValue(Number.parseInt(value as string), format)
							: ""
					}
					{...props}
				/>
			)}
		/>
	);
};
