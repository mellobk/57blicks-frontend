import { FC } from "react";

type Props = {
	text: string;
};

export const Title: FC<Props> = ({ text }) => (
	<h1 className="font-inter text-[28px] text-primary-500 leading-[34px] tracking-[-1.4px]">
		{text}
	</h1>
);
