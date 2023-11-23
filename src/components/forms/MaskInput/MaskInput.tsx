import { DatePicker } from "@/components/ui/DatePicker";
import type { ForwardRefRenderFunction } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { InputMask, type InputMaskProps } from "primereact/inputmask";
import { ErrorText } from "@/components/forms/ErrorText";
import { Label } from "@/components/forms/Label";
import { Icon, type ICONS } from "@/components/ui/Icon";
import { inputClassName } from "@/utils/class-names";
interface DatePickerProps {
    inputId?: string;
    name?: string;
    value?: Date | string;
    invalid?: boolean;
    className?: string;
    disabled?: boolean;
    placeholder?: string;
    maxDate?: Date;
    minDate?: Date;
    view?: "date" | "month" | "year";
    dateFormat?: string;
    onChange?: (event: Date) => void;
    wrapperClassName?: string;
}
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
    datePickerProps?: DatePickerProps;
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
    datePickerProps,
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
				{datePickerProps ? (
          			// Render the DatePicker component if datePickerProps is provided
          			<DatePicker {...datePickerProps} />
                    //   <div></div>
        			) : (
          			// Render the InputMask component if datePickerProps is not provided
          			<InputMask
						className={`${className} ${
						iconName && "pr-[30px]"
						} outline-none border-none focus:outline-none focus:border-transparent shadow-none`}
						mask={mask}
						{...props}
						{...register}
          			/>
                    
        		)}
            </div>
            <ErrorText error={error} />
        </div>
    );
};
