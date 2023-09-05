/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { InputMask } from "primereact/inputmask";
import { classNames } from "primereact/utils";
import { Icon, type IconNames } from "@/components/ui/Icon";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	placeholder?: string;
	className?: string;
	error?: any;
	iconName?: (typeof IconNames)[number];
	register?: UseFormRegisterReturn;
	defaultValue?: string;
	iconWidth?: string;
	iconColor?: string;
	mask?: string;
	clickIcon?: () => void;
	value?: string;
	type?: string;
}

export const MaskInput: ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps
> = ({
	label,
	placeholder,
	error,
	register,
	iconName,
	required,
	disabled = false,
	defaultValue,
	type = "text",
	className = `placeholder-gray-400 focus:outline-none ${
		error ? "text-red-ERROR bg-gray-100" : "bg-gray-200"
	} font-normal font-weight-400 leading-normal tracking-wide flex w-full h-10 p-4 items-center self-stretch rounded-md`,
	mask,
	iconWidth = "20",
	iconColor = "#000",
	value,
	clickIcon,
}) => {
	return (
		<div className="flex flex-col gap-2">
			{label && (
				<div className="font-semibold text-gray-600 ">
					<div>
						{label} {required && <span className="text-red-ERROR">*</span>}
					</div>
				</div>
			)}
			<div className="relative">
				{iconName && (
					<div
						className="absolute top-0 right-2 bottom-0 flex items-center justify-center"
						data-testid="icon"
					>
						<div onClick={clickIcon}>
							<Icon
								name={iconName || "search"}
								width={iconWidth}
								color={iconColor}
							/>
						</div>
					</div>
				)}

				<InputMask
					className={`${className} ${
						iconName && "pr-[30px]"
					} outline-none border-none focus:outline-none focus:border-transparent shadow-none`}
					type={type}
					defaultValue={defaultValue}
					placeholder={placeholder}
					disabled={disabled}
					required={required}
					{...register}
					value={value}
					mask={mask}
				/>
			</div>
			{error && (
				<div
					className={classNames(
						"text-red-ERROR",
						"leading-normal tracking-tight"
					)}
				>
					{error}
				</div>
			)}
		</div>
	);
};