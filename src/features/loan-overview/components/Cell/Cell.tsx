import { FC } from "react";
import { moneyFormat } from "@/utils/formats";

type Props = {
	bold?: boolean;
	type?: "number" | "text";
	value?: number | string;
};

export const Cell: FC<Props> = ({ bold, type = "number", value }) => (
	<p
		className={`${
			bold ? "font-bold" : "font-normal"
		} font-inter text-[13px] text-primary-300 leading-4 tracking-[-0.65px]`}
	>
		{type === "number" && typeof value === "number"
			? moneyFormat(value)
			: value}
	</p>
);
