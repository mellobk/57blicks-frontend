import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { ErrorText } from "@/components/forms/ErrorText";
import { Label } from "@/components/forms/Label";
import { inputClassName, placeholderClassName } from "@/utils/class-names";
import { moneyFormat, percentageFormat } from "@/utils/formats";

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
	className = inputClassName(error),
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
	const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

	useEffect(() => {
		if (isEditing && inputRef) {
			inputRef.focus();
		}
	}, [isEditing, inputRef]);

	return (
		<Controller
			name={name}
			control={control}
			defaultValue=""
			render={({ field: { onChange, onBlur, value, ref } }) => (
				<div className={`flex flex-col gap-2 ${wrapperClassName}`}>
					<Label label={label} required={required} />
					<div className="relative">
						{isEditing ? (
							<input
								className={className}
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
								ref={(e) => {
									ref(e);
									setInputRef(e);
								}}
								type="number"
								value={String(value)}
								{...props}
							/>
						) : value ? (
							<span className={className} onClick={() => setIsEditing(true)}>
								{format === "money" && moneyFormat(Number(value))}
								{format === "percentage" && percentageFormat(Number(value))}
							</span>
						) : (
							<span
								className={placeholderClassName()}
								onClick={() => setIsEditing(true)}
							>
								{placeholder}
							</span>
						)}
					</div>

					<ErrorText error={error} />
				</div>
			)}
		/>
	);
};
