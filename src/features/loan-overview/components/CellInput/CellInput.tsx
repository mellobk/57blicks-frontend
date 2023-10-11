import type { FC } from "react";
import { Input } from "@/components/forms/Input";

type Props = {
	value: number | string;
};

export const CellInput: FC<Props> = ({ value }) => (
	<Input
		className={`bg-transparent h-full w-full py-3 px-4 hover:bg-gray-200 focus-visible:border-gold-500 focus-visible:border-2 focus-visible:outline-none font-inter text-[13px] text-primary-300 leading-4 tracking-[-0.65px]`}
		placeholder="$0.00"
		type="number"
		value={typeof value === "number" ? value.toString() : value}
	/>
);
