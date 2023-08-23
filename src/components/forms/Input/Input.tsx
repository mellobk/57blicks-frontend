import type {ForwardRefRenderFunction, InputHTMLAttributes} from "react";
import { classNames } from "primereact/utils";
import type { UseFormRegisterReturn } from "react-hook-form";
import IconTemplate from "@/assets/icons/icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	title?: string;
	placeholder?: string;
	required?: boolean;
	error?: string;
	iconName?: string;
	register?: UseFormRegisterReturn;
	disabled?: boolean;
	defaultValue?: string;
}

export const Input: ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps
> = ({
	title,
	placeholder,
	error,
	register,
	iconName,
	required,
	disabled = false,
	defaultValue,
}) => {
	return (
		<div className="flex flex-col gap-2">
			<div className="font-semibold text-gray-600 ">
				<div>
					{title} {required && <span className="text-red-ERROR">*</span>}
				</div>
			</div>
			<div className="relative">
				{iconName && (
					<div
						className="absolute top-0 right-2 bottom-0 flex items-center justify-center"
						data-testid="icon"
					>
						<IconTemplate
							name={iconName || "search"}
							width="20"
							color={"#000"}
						/>
					</div>
				)}

				<input
					className={classNames(
						error ? "text-red-ERROR bg-gray-100 " : "bg-gray-200",
						"focus:outline-none",
						"placeholder-gray-400 font-normal font-weight-400 leading-normal tracking-wide flex w-full h-10 p-4 items-center self-stretch rounded-md"
					)}
					type="text"
					defaultValue={defaultValue}
					placeholder={placeholder}
					disabled={disabled}
					{...register}
				/>
			</div>
			{error && (
				<div
					className={classNames(
						"font-weight-400",
						"text-red-ERROR",
						"font-normal font-weight-400 leading-normal tracking-tight"
					)}
				>
					{error}
				</div>
			)}
		</div>
	);
};
