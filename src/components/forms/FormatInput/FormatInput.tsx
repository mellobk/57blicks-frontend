import { type FC, type InputHTMLAttributes, useState } from "react";
import { type Control, Controller } from "react-hook-form";
import { ErrorText } from "@/components/forms/ErrorText";
import { Label } from "@/components/forms/Label";
import { inputClassName } from "@/utils/class-names";
import { formatPlaceholder, formatValue } from "@/utils/formats";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	control: Control<any>;
	error?: string;
	format: "money" | "percentage";
	label?: string;
	name: string;
	wrapperClassName?: string;
}

export const FormatInput: FC<Props> = ({
	error,
	className,
	control,
	format,
	label,
	name,
	placeholder,
	required,
	wrapperClassName,
	...props
}) => {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur, value } }) => (
				<div className={`flex flex-col gap-2 ${wrapperClassName}`}>
					<Label label={label} required={required} />

					<div className="relative">
						<input
							className={`${className} ${inputClassName(error)}`}
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
							onFocus={() => {
								setIsEditing(true);
							}}
							placeholder={formatPlaceholder(format, placeholder)}
							type={isEditing ? "number" : "text"}
							value={
								isEditing
									? String(value)
									: value
									? formatValue(value, format)
									: ""
							}
							{...props}
						/>
					</div>

					<ErrorText error={error} />
				</div>
			)}
		/>
	);
};
