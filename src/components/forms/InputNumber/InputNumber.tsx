/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/prefer-logical-operator-over-ternary */
import type { ForwardRefRenderFunction, InputHTMLAttributes } from "react";

import { InputNumber as InputNumberComp } from "primereact/inputnumber";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: any;
	currency?: string;
	handleChange?: (value: number) => void;
	customValue: number;
}

export const InputNumber: ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps
> = ({
	placeholder,
	error,

	disabled = false,
	defaultValue,

	className,

	currency = "USD",
	customValue,
	handleChange,
}) => {
	//inputClassName(error);
	return (
		<>
			<div className="relative">
				<InputNumberComp
					placeholder={placeholder}
					defaultValue={defaultValue}
					disabled={disabled}
					inputId="horizontal-buttons"
					className={`w-full   ${className}`}
					inputClassName={`${
						error ? "border-2 border-red-ERROR" : ""
					} outline-none rounded-none border-gold	shadow-none w-full border-2	 br-0 focus:bg-gray-200 h-[42px]`}
					min={0}
					value={customValue}
					onChange={(event): void => {
						handleChange && handleChange(event.value || 0);
					}}
					mode="currency"
					currency={currency}
				/>
			</div>
		</>
	);
};
