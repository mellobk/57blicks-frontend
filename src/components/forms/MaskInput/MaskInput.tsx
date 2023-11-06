import type { ForwardRefRenderFunction } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { InputMask, InputMaskProps } from "primereact/inputmask";
import { ErrorText } from "@/components/forms/ErrorText";
import { Label } from "@/components/forms/Label";
import { Icon, type ICONS } from "@/components/ui/Icon";
import { inputClassName } from "@/utils/class-names";

interface InputProps extends InputMaskProps {
	label?: string;
	error?: any;
	iconName?: keyof typeof ICONS;
	register?: UseFormRegisterReturn;
	iconWidth?: string;
	iconColor?: string;
	mask?: string;
	clickIcon?: () => void;
	wrapperClassName?: string;
}

export const MaskInput: ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps
> = ({
	label,
	error,
	register,
	iconName,
	required,
	className = inputClassName(error),
	mask,
	iconWidth = "20",
	iconColor = "#000",
	clickIcon,
	wrapperClassName,
	...props
}) => {
	return (
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

				<InputMask
					className={`${className} ${
						iconName && "pr-[30px]"
					} outline-none border-none focus:outline-none focus:border-transparent shadow-none`}
					mask={mask}
					{...props}
					{...register}
				/>
			</div>

			<ErrorText error={error} />
		</div>
	);
};
