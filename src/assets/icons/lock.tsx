import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const Lock: FC<Props> = ({ color = "#BBBBBB", width = "48" }) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 24 24"
			fill={color}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M17 10h-1V8c0-2.205-1.794-4-4-4S8 5.795 8 8v2H7c-1.103 0-2 .896-2 2v7c0 1.104.897 2 2 2h10c1.103 0 2-.896 2-2v-7c0-1.104-.897-2-2-2zm-5 8.299a1.3 1.3 0 110-2.6 1.3 1.3 0 010 2.6zM14 11h-4V8c0-1.104.897-2 2-2s2 .896 2 2v3z" />
		</svg>
	);
};

export default Lock;
