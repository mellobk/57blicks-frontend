import type { FC } from "react";
import { formatValue } from "@/utils/formats";

type Props = {
	bold?: boolean;
	className?: string;
	format: "money" | "percentage" | "text";
	value: number | string;
};

export const Cell: FC<Props> = ({ bold, className = "", format, value }) => (
	<p
		className={`${className} ${
			bold ? "font-bold" : "font-normal"
		} flex h-full w-full px-4 items-center font-inter text-[13px] text-primary-300 leading-4 tracking-[-0.65px]`}
	>
		{format === "text" ? String(value) : formatValue(Number(value), format)}
	</p>
);
