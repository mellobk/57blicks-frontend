import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
	height?: string;
};

const ArrowRight: FC<Props> = ({
	color = "#BBBBBB",
	width = "7",
	height = "13",
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 7 13"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M1 1.5L6 6.5L1 11.5"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default ArrowRight;
