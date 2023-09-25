import type { ForwardRefRenderFunction, TextareaHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { ErrorText } from "@/components/forms/ErrorText";
import { Label } from "@/components/forms/Label";
import { Icon, type IconNames } from "@/components/ui/Icon";
import {inputClassName} from "@/utils/class-names.ts";

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
	className = inputClassName(error),
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
		<Label label={label} required={required} />

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
				className={`h-36 ${className} ${iconName && "pr-[30px]"}`}
				rows={rows}
				{...props}
				{...register}
			/>
		</div>

		<ErrorText error={error} />
	</div>
);
