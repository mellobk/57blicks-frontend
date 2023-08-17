import { Dropdown as DropdownC, DropdownProps as DropdownCProps } from "primereact/dropdown";
import IconTemplate from "../../../assets/icons/icons";

export interface DropdownProps extends DropdownCProps {}

export const Dropdown = ({ ...props }: DropdownProps) => {
	return (
		<DropdownC
			{...props}
			className="min-w-full rounded-lg bg-gray-200 border-none outline-0 shadow-none"
			pt={{
				input: { className: 'text-[13px] text-black placeholder:text-gray-1000' },
				wrapper: { className: 'bg-gray-200 rounded-b-lg p-0' },
				list: { className: 'p-0' },
				item: { className: 'text-[13px] bg-gray-200 text-black hover:bg-gray-300' },
			}}
      dropdownIcon={<IconTemplate name="arrowDown" />}
		/>
	);
};
