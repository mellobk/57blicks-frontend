import type { ForwardRefRenderFunction } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Dropdown, type DropdownProps } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { Icon } from "@/components/ui/Icon";

interface SelectProps extends DropdownProps {
	error?: string;
	iconName?: string;
	label?: string;
	register?: UseFormRegisterReturn;
	required?: boolean;
}

export const Select: ForwardRefRenderFunction<
	HTMLSelectElement,
	SelectProps
> = ({ error, iconName, label, register, required, ...props }) => {
	return (
		<div className="flex flex-col gap-2 pt-6">
			<div className="font-semibold text-gray-600 ">
				<div>
					{label} {required && <span className="text-red-ERROR">*</span>}
				</div>
			</div>
			<div className="relative">
				{iconName && (
					<div
						className="absolute top-0 right-2 bottom-0 flex items-center justify-center"
						data-testid="icon"
					>
						<Icon name={iconName} width="20" color={"#000"} />
					</div>
				)}

				<Dropdown
					className={classNames(
						error ? "text-red-ERROR bg-gray-100 " : "bg-gray-200",
						"focus:outline-none border-none shadow-none",
						"tracking-wide flex w-full h-10 p-4 items-center self-stretch rounded-md"
					)}
					pt={{
						input: {
							className:
								"p-0 font-inter font-normal leading-none text-sm text-gray-400",
						},
						wrapper: { className: "bg-gray-200 rounded-b-lg p-0" },
						trigger: { className: "w-auto" },
						list: { className: "p-0" },
						item: {
							className:
								"text-[13px] bg-gray-200 text-primary-300 hover:bg-gray-300",
						},
					}}
					dropdownIcon={<Icon name="arrowDown" width="10" />}
					{...register}
					{...props}
				/>
			</div>
			{error && <div className="text-red-ERROR">{error}</div>}
		</div>
	);
};
