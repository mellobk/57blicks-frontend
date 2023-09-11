import { FC } from "react";

type Props = {
	text: string;
	textColor?: string;
};

export const Title: FC<Props> = ({ text, textColor }) => (
	<h1
		className={`${
			textColor || "text-primary-500"
		} font-inter text-[28px] leading-[34px] tracking-[-1.4px]`}
	>
		{text}
	</h1>
);
