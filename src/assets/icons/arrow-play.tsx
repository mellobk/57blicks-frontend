import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
	height?: string;
};

const ArrowPlay: FC<Props> = ({
	color = "#656A74",
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
			<path d="M0.5 12.5L6.5 6.5L0.5 0.500001L0.5 12.5Z" fill={color} />
		</svg>
	);
};

export default ArrowPlay;
