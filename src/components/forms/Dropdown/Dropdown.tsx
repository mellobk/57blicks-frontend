import { type ForwardRefRenderFunction } from "react";
import { Control, Controller } from "react-hook-form";
import {
	Dropdown as PrimereactDropdown,
	type DropdownProps,
} from "primereact/dropdown";
import { ErrorText } from "@/components/forms/ErrorText";
import { Label } from "@/components/forms/Label";
import { Icon } from "@/components/ui/Icon";
import { inputClassName } from "@/utils/class-names";
import { placeholderFormat } from "@/utils/formats";

export type Option = {
	name: string;
	code: string;
};

interface SelectProps extends DropdownProps {
	control: Control<any>;
	error?: string;
	label: string;
	name: string;
}

export const Dropdown: ForwardRefRenderFunction<
	HTMLSelectElement,
	SelectProps
> = ({
	className,
	control,
	error,
	label,
	name,
	placeholder,
	required,
	...props
}) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<div className={`flex flex-col gap-2 ${className}`}>
					<Label label={label} required={required} />

					<div className="relative">
						<PrimereactDropdown
							className={inputClassName(error)}
							dropdownIcon={<Icon name="arrowDown" width="6" color="#656A74" />}
							optionLabel="name"
							optionValue="code"
							placeholder={placeholderFormat(label, placeholder, true)}
							pt={{
								input: {
									className:
										"p-0 font-inter text-[13px] text-primary-500 leading-4 tracking-[-0.65px]",
								},
								wrapper: { className: "bg-gray-200 rounded-b-lg p-0" },
								trigger: { className: "w-auto" },
								list: { className: "p-0" },
								item: {
									className: "text-[13px] text-primary-300 hover:bg-gray-300",
								},
							}}
							{...field}
							{...props}
						/>
					</div>

					<ErrorText error={error} />
				</div>
			)}
		/>
	);
};
