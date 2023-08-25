import type { ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Icon, IconNames } from "@/components/ui/Icon";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	placeholder?: string;
	error?: string;
	iconName?: typeof IconNames[number];
	register?: UseFormRegisterReturn;
	defaultValue?: string;
}

export const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
	label,
	placeholder,
	error,
	register,
	iconName,
	required,
	disabled = false,
	defaultValue,
	...props
}) => {
	return (
		<div className="flex flex-col gap-2 pt-6">
			<div className="font-semibold text-gray-600 ">
				<div>
					{label} {required && <span className="text-red-ERROR">*</span>}
				</div>
			</div>
			<div className="relative">
				{iconName && (
					<div
						className="absolute top-0 right-2 bottom-0 flex items-center justify-center"
						data-testid="icon"
					>
						<Icon name={iconName || "search"} width="20" color={"#000"} />
					</div>
				)}

				<input
					className={classNames(
						error ? "text-red-ERROR bg-gray-100 " : "bg-gray-200",
						"focus:outline-none",
						"text-gray-400 font-inter leading-normal tracking-wide flex w-full h-10 p-4 items-center self-stretch rounded-md"
					)}
					type="text"
					defaultValue={defaultValue}
					placeholder={placeholder}
					disabled={disabled}
					required={required}
					{...register}
					{...props}
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
