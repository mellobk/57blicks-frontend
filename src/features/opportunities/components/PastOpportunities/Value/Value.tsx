import type { FC } from "react";

interface Props {
	label: string;
	value: string;
}

export const Value: FC<Props> = ({ label, value }) => (
	<div className="flex flex-row justify-between mt-3 font-inter text-[13px] text-primary-500 leading-4 tracking-[-0.65px]">
		<div className="text-gray-1000">{label}</div>
		{value}
	</div>
);
