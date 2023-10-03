import type { FC } from "react";

interface Props {
	subtitle: string;
}

export const Subtitle: FC<Props> = ({ subtitle }) => (
	<h2 className="text-primary-500 font-extrabold text-base">{subtitle}</h2>
);
