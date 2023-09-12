import type { ForwardRefRenderFunction, TextareaHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Icon, type IconNames } from "@/components/ui/Icon";
import { classNames } from "primereact/utils";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	clickIcon?: () => void;
	error?: any;
	iconColor?: string;
	iconName?: (typeof IconNames)[number];
	iconWidth?: string;
	label?: string;
	register?: UseFormRegisterReturn;
	wrapperClassName?: string;
}

export const TextArea: ForwardRefRenderFunction<
	HTMLTextAreaElement,
	TextAreaProps
> = ({
	error,
	className = `placeholder-gray-400 focus:outline-none ${
		error ? "text-red-ERROR bg-gray-100" : "bg-gray-200"
	} font-normal font-weight-400 leading-normal tracking-wide flex w-full p-4 rounded-md`,
	clickIcon,
	iconColor = "#000",
	iconName,
	iconWidth = "20",
	label,
	required,
	register,
	rows = 7,
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

			<textarea
				className={`${className} ${iconName && "pr-[30px]"}`}
        rows={rows}
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
