import { FC, InputHTMLAttributes, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { formatValue } from "@/utils/formats.ts";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	control: Control<any>;
	format: "money" | "percentage";
	name: string;
}

export const FormatInput: FC<Props> = ({ control, format, name, ...props }) => {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<Controller
			name={name}
			control={control}
			defaultValue=""
			render={({ field: { onChange, onBlur, value } }) => (
				<input
					className="h-full w-full py-3 px-4 bg-white hover:bg-gray-200 focus-visible:border-gold-500 focus-visible:border-2 focus-visible:outline-none"
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
					type={isEditing ? "number" : "text"}
					value={isEditing ? String(value) : formatValue(value, format)}
					{...props}
				/>
			)}
		/>
	);
};
