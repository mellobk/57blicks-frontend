import { type FC, useState } from "react";
import { Input } from "@/components/forms/Input";

type Props = {
	setValue: (value: string) => void;
	value: string;
};

export const SearchBar: FC<Props> = ({ setValue, value }) => {
	const [visible, setVisible] = useState<boolean>(false);

	return (
		<div
			className={`${
				visible || value
					? "w-[200px] bg-transparent"
					: "bg-transparent w-[30px]"
			} transition duration-500`}
			onMouseEnter={() => {
				setVisible(true);
			}}
			onMouseLeave={() => {
				setVisible(false);
			}}
		>
			<Input
				type="text"
				value={value}
				placeholder="Search"
				iconColor={visible || value ? "#0E2130" : "rgba(14, 33, 48, 0.5)"}
				iconWidth={value ? "10" : "18"}
				iconName={value ? "wrong" : "search"}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				clickIcon={() => {
					setValue("");
				}}
				className={`${
					visible || value ? "bg-gray-200" : "bg-transparent"
				} rounded-2xl w-full px-4 py-2 placeholder-primary-500/[.5] text-primary-500 text-[13px] leading-[18px] tracking-[-0.65px] caret-blue-200 items-center outline-none`}
			/>
		</div>
	);
};
