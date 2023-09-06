import { type ForwardRefRenderFunction, useEffect, useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Dropdown, type DropdownProps } from "primereact/dropdown";
import { Icon } from "@/components/ui/Icon";

export type Option = {
	name: string;
	code: string;
};

interface SelectProps extends DropdownProps {
	error?: string;
	iconName?: string;
	label?: string;
	register?: UseFormRegisterReturn;
	className?: string;
	value?: Option;
}

export const Select: ForwardRefRenderFunction<
	HTMLSelectElement,
	SelectProps
> = ({
	error,
	iconName,
	label,
	register,
	required,
	className,
	onChange,
	value,
	...props
}) => {
	const [selectedData, setSelectedData] = useState<Option>();

	useEffect(() => {
		if (value) {
			setSelectedData(value);
		}
	}, []);

	return (
		<div className={`flex flex-col gap-2 ${className}`}>
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
						<Icon name={iconName} width="20" color="#000" />
					</div>
				)}

				<Dropdown
					{...register}
					value={selectedData}
					onChange={(event): void => {
						setSelectedData(event.value);
						onChange?.(event);
					}}
					options={props.options}
					optionLabel="name"
					placeholder="Select Dropdown"
					dropdownIcon={<Icon name="arrowDown" width="10" color="black" />}
					className={`w-full md:w-14rem ${
						error ? "text-red-ERROR bg-gray-100 " : "bg-gray-200"
					} focus:outline-none border-none shadow-none tracking-wide flex w-full h-10 p-3 items-center self-stretch rounded-md`}
					pt={{
						input: {
							className:
								"p-2 font-inter font-normal leading-none  text-black text-[13px]",
						},
						wrapper: { className: "bg-gray-200 rounded-b-lg p-0" },
						trigger: { className: "w-auto" },
						list: { className: "p-0" },
						item: {
							className: "text-[13px]  text-primary-300 hover:bg-gray-300",
						},
					}}
				/>
			</div>
			{error && <div className="text-red-ERROR">{error}</div>}
		</div>
	);
};
