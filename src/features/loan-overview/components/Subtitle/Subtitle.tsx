import { FC } from "react";

type Props = {
	text: string;
};

export const Subtitle: FC<Props> = ({ text }) => (
	<h2 className="px-6 py-4 border-b border-gray-200 font-inter text-2xl text-primary-500 leading-[29px] tracking-[-1.2px]">
		{text}
	</h2>
);
