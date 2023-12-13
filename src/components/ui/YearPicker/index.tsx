import { Button } from "../Button";
import type { FC } from "react";
import { Icon } from "../Icon";
import { useState } from "react";

interface YearPickerProps {
	year?: number;
	onChange?: (year: number) => void;
	disabled?: boolean;
}

const YearPicker: FC<YearPickerProps> = ({ year, disabled, onChange }) => {
	const [selectedYear, setSelectedYear] = useState<number>(
		year || new Date().getFullYear()
	);

	return (
		<>
			<div
				className="flex flex-row  w-[120px] h-[35px] bg-black-100  text-white font-bold justify-between pl-2 pr-2 items-center align-middle
        rounded-2xl

      "
			>
				<div
					className="cursor-pointer"
					onClick={() => {
						setSelectedYear(selectedYear - 1);
						onChange && onChange(selectedYear - 1);
					}}
				>
					<Button
						className="bg-transparent w-[10px] pl-2 pr-0"
						onClick={() => {
							setSelectedYear(selectedYear - 1);
							onChange && onChange(selectedYear - 1);
						}}
						disabled={disabled}
						icon={<Icon name="arrowLeft" color="#C79E63" width="15" />}
					/>
				</div>
				<div className="transition-all duration-300 ">{selectedYear}</div>

				<div
					className="cursor-pointer"
					onClick={() => {
						setSelectedYear(selectedYear + 1);
						onChange && onChange(selectedYear + 1);
					}}
				>
					<Button
						className="bg-transparent w-[10px] pl-0 pr-2"
						onClick={() => {
							setSelectedYear(selectedYear - 1);
							onChange && onChange(selectedYear - 1);
						}}
						disabled={disabled}
						icon={<Icon name="arrowRight" color="#C79E63" width="15" />}
					/>
				</div>
			</div>
		</>
	);
};

export default YearPicker;
