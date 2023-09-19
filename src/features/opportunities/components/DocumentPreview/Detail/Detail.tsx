import type { FC } from "react";

interface Props {
	title: string;
	value?: string;
}

export const Detail: FC<Props> = ({ title, value }) => (
	<div className="flex flex-row gap-1">
		<h3 className="text-primary-500 font-extrabold text-xs">{title}:</h3>
		<p className="text-primary-500 text-xs">{value || ""}</p>
	</div>
);
