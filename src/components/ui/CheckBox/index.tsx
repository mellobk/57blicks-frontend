import {
	type CheckboxChangeEvent,
	Checkbox as CheckboxPrime,
} from "primereact/checkbox";

import type { FC } from "react";

interface CheckboxProps {
	name: string;
	value: string;
	text: string;
	checked: boolean;
	inputId: string;
	setChecked: (target: CheckboxChangeEvent) => void;
}
const Checkbox: FC<CheckboxProps> = ({
	name,
	value,
	text,
	checked,
	inputId,
	setChecked,
}) => {
	return (
		<>
			<div className="flex align-items-center">
				<CheckboxPrime
					inputId={inputId}
					onChange={setChecked}
					checked={checked}
					name={name}
					value={value}
				/>
				{/* <Checkbox
					inputId={category.key}
					name="category"
					value={category}
					onChange={onCategoryChange}
					checked={selectedCategories.some((item) => item.key === category.key)}
				/> */}
				<label className="ml-2">{text}</label>
			</div>
		</>
	);
};

export default Checkbox;
