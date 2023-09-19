import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const ArrowDown: FC<Props> = ({ color = "#BBBBBB", width = "48" }: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 9 8"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M6.7504 0C7.3464 0 7.91973 0.235556 8.34151 0.658222C8.76373 1.08 8.99973 1.64889 8.99973 2.24444V5.75556C8.99973 6.99556 7.99084 8 6.7504 8H2.35973C1.11928 8 0.11084 6.99556 0.11084 5.75556V2.24444C0.11084 1.00444 1.11484 0 2.35973 0H6.7504ZM7.25306 2.31111C7.15973 2.30622 7.07084 2.33778 7.00373 2.4L4.99973 4C4.74195 4.21378 4.37262 4.21378 4.11084 4L2.11084 2.4C1.97262 2.29778 1.78151 2.31111 1.6664 2.43111C1.5464 2.55111 1.53306 2.74222 1.63484 2.87556L1.69306 2.93333L3.71528 4.51111C3.96417 4.70667 4.26595 4.81333 4.58195 4.81333C4.89706 4.81333 5.20417 4.70667 5.45262 4.51111L7.45751 2.90667L7.49306 2.87111C7.59929 2.74222 7.59929 2.55556 7.48817 2.42667C7.4264 2.36044 7.34151 2.32 7.25306 2.31111Z"
				fill={color}
			/>
		</svg>
	);
};

export default ArrowDown;
