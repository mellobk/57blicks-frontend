import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { moneyFormat, percentageFormat } from "@/utils/formats";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	control: Control<any>;
	format: "money" | "percentage";
	name: string;
}

export const FormatInput: FC<Props> = ({ control, format, name, ...props }) => {
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
				<>
					{isEditing ? (
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
							ref={(e) => {
								ref(e);
								setInputRef(e);
							}}
							type="number"
							value={String(value)}
							{...props}
						/>
					) : (
						<span
							className="flex h-full w-full items-center px-4 bg-white hover:bg-gray-200"
							onClick={() => setIsEditing(true)}
						>
							{format === "money" && moneyFormat(Number(value))}
							{format === "percentage" && percentageFormat(Number(value))}
						</span>
					)}
				</>
			)}
		/>
	);
};
