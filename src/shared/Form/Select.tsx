import { Dropdown, DropdownProps } from "primereact/dropdown";
import { ReactNode } from "react";

interface IProps extends DropdownProps {
  id: string;
  children: ReactNode;
  options: Array<{ label: string; value: string }>;
}

const Select = ({ children, options, id, ...props }: IProps) => {
  return (
    <label className="flex flex-col w-full items-start gap-y-2" htmlFor={id}>
      <span className="font-medium">{children}</span>
      <Dropdown
        id={id}
        options={options.map((option) => ({
          optionLabel: option.label,
          optionValue: option.value,
        }))}
        {...props}
      />
    </label>
  );
};

export { Select };
