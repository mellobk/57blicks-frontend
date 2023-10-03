import type { FC } from "react";

interface Props {
	subtitle: string;
	selected: boolean;
}

export const Subtitle: FC<Props> = ({ subtitle, selected }) => (
	<div
		className={`${
			selected ? "text-gold-500" : "text-primary-500"
		} font-inter text-base leading-[19px] tracking-tighter`}
	>
		{subtitle}
	</div>
);
