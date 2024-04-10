import { Button } from "../Button";
import type { FC } from "react";
import { Icon } from "../Icon";
import { useState } from "react";

interface YearPickerProps {
	year?: number;
	onChange?: (year: number) => void;
	disabled?: boolean;
	arrowColors?: string;
	backgroundColor?: string;
	textColor?: string;
}

const YearPicker: FC<YearPickerProps> = ({
	year,
	disabled,
	onChange,
	arrowColors = "#C79E63",
	backgroundColor = "bg-black-100",
	textColor = "text-white",
}) => {
	const [selectedYear, setSelectedYear] = useState<number>(
		year || new Date().getFullYear()
	);

	return (
		<>
			<div
				className={`flex flex-row  w-[120px] h-[35px]   ${backgroundColor} ${textColor} font-bold justify-between pl-2 pr-2 items-center gap-3
        rounded-2xl`}
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
						icon={<Icon name="arrowLeft" color={arrowColors} width="15" />}
					/>
				</div>
				<div className="transition-all duration-300 flex items-center justify-center ">
					{selectedYear}
				</div>

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
						icon={<Icon name="arrowRight" color={arrowColors} width="15" />}
					/>
				</div>
			</div>
		</>
	);
};

export default YearPicker;
