import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const Clock: FC<Props> = ({ color = "#BBBBBB", width = "48" }) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default Clock;
