import { type ForwardRefRenderFunction } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Dropdown, type DropdownProps } from "primereact/dropdown";
import { ErrorText } from "@/components/forms/ErrorText";
import { Label } from "@/components/forms/Label";
import { Icon } from "@/components/ui/Icon";
import { inputClassName } from "@/utils/class-names";

export type Option = {
	name: string;
	code: string;
};

interface SelectProps extends DropdownProps {
	error?: string;
	label: string;
	register?: UseFormRegisterReturn;
	value?: string;
}

export const Select: ForwardRefRenderFunction<
	HTMLSelectElement,
	SelectProps
> = ({
	className,
	error,
	label,
	onChange,
	register,
	required,
	value,
	...props
}) => {
	return (
		<div className={`flex flex-col gap-2 ${className}`}>
			<Label label={label} required={required} />

			<div className="relative">
				<Dropdown
					{...props}
					{...register}
					value={value}
					onChange={(e): void => {
						onChange?.(e);
					}}
					optionLabel="name"
					optionValue="code"
					className={inputClassName(error)}
					dropdownIcon={<Icon name="arrowDown" width="6" color="#656A74" />}
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
				/>
			</div>

			<ErrorText error={error} />
		</div>
	);
};
