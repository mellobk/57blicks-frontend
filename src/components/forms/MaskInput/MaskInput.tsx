import type { ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { InputMask } from "primereact/inputmask";
import { ErrorText } from "@/components/forms/ErrorText";
import { Label } from "@/components/forms/Label";
import { Icon, type IconNames } from "@/components/ui/Icon";
import { inputClassName } from "@/utils/class-names";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	placeholder?: string;
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
	wrapperClassName?: string;
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
	className = inputClassName(error),
	mask,
	iconWidth = "20",
	iconColor = "#000",
	value,
	clickIcon,
	wrapperClassName,
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
					type={type}
					defaultValue={defaultValue}
					placeholder={placeholder}
					disabled={disabled}
					{...register}
					value={value}
					mask={mask}
				/>
			</div>

			<ErrorText error={error} />
		</div>
	);
};
