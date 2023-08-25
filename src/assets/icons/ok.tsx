import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const Ok: FC<Props> = ({ color = "#BBBBBB", width = "48" }: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 13 9"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M11.5 0.890625L4.28125 8.10938L1 4.82812"
				stroke={color}
				strokeWidth="1.125"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default Ok;
