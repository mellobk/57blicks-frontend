import { FC } from "react";

type Props = {
	color?: string;
	text: string;
};

export const Title: FC<Props> = ({ color, text }) => (
	<h1
		className={`${
			color || "text-primary-500"
		} font-inter text-[28px] leading-[34px] tracking-[-1.4px]`}
	>
		{text}
	</h1>
);
