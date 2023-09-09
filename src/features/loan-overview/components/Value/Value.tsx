import { FC } from "react";
import { moneyFormat } from "@/utils/format";

type Props = {
	checkAndBalance?: boolean;
	label: string;
	value: number;
};

export const Value: FC<Props> = ({ checkAndBalance, label, value }) => (
	<div className="flex flex-col gap-2 p-6">
		<h3 className="font-inter text-base text-gray-1000 font-semibold leading-[19px] tracking-tighter">
			{label}
		</h3>
		<h1
			className={`font-inter text-[28px] ${
				checkAndBalance ? "text-green-500" : "text-primary-500"
			} leading-[34px] tracking-[-1.4px]`}
		>
			{moneyFormat(value)}
		</h1>
	</div>
);
