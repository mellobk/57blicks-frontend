import type { ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Icon, type IconNames } from "@/components/ui/Icon";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	clickIcon?: () => void;
	error?: any;
	iconColor?: string;
	iconName?: (typeof IconNames)[number];
	iconWidth?: string;
	label?: string;
	register?: UseFormRegisterReturn;
	wrapperClassName?: string;
}

export const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
	error,
	className = `placeholder-gray-400 focus:outline-none ${
		error ? "text-red-ERROR bg-gray-100" : "bg-gray-200"
	} font-normal font-weight-400 leading-normal tracking-wide flex w-full h-10 p-4 items-center self-stretch rounded-md`,
	clickIcon,
	iconColor = "#000",
	iconName,
	iconWidth = "20",
	label,
	required,
	register,
	wrapperClassName,
	...props
}) => (
	<div className={`flex flex-col gap-2 ${wrapperClassName}`}>
		{label && (
			<div className="font-semibold text-gray-600">
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

			<input
				className={`${className} ${iconName && "pr-[30px]"}`}
				{...props}
				{...register}
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
