import { type Control, Controller } from "react-hook-form";
import type { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	control: Control<any>;
	error?: string;
	name: string;
}

export const CellInputText: FC<Props> = ({
	control,
	error,
	name,
	placeholder,
	...props
}) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur } }) => (
				<input
					className={`h-full w-full py-3 px-4 bg-transparent ${
						error ? "border-2 border-red-ERROR" : ""
					} hover:bg-gray-200 focus-visible:border-gold-500 focus-visible:border-2 focus-visible:outline-none items-center font-inter text-[13px] text-primary-300 leading-4 tracking-[-0.65px]`}
					min={0}
					onBlur={(): void => {
						onBlur();
					}}
					onChange={(event): void => {
						let inputValue = event.target.value;

						if (inputValue !== "") {
							inputValue = Number(inputValue).toString();
						}

						onChange(inputValue);
					}}
					placeholder={placeholder}
					type="text"
					value={props.value ?? ""}
					{...props}
				/>
			)}
		/>
	);
};
