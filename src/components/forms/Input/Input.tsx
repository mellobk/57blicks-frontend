import type { ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { ErrorText } from "@/components/forms/ErrorText";
import { Label } from "@/components/forms/Label";
import { Icon, type IconNames } from "@/components/ui/Icon";
import { inputClassName } from "@/utils/class-names";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	clickIcon?: () => void;
	error?: string;
	iconColor?: string;
	iconName?: (typeof IconNames)[number];
	iconWidth?: string;
	label?: string;
	register?: UseFormRegisterReturn;
	wrapperClassName?: string;
}

export const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
	error,
	className = inputClassName(error),
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

			<input
				className={`${className} ${iconName && "pr-[30px]"}`}
				{...props}
				{...register}
			/>
		</div>

		<ErrorText error={error} />
	</div>
);
