import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const TimeUsage: FC<Props> = ({ color = "#BBBBBB", width = "48" }) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 12 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M6 13.9163C9.31371 13.9163 12 11.2301 12 7.91634C12 4.60263 9.31371 1.91634 6 1.91634C2.68629 1.91634 0 4.60263 0 7.91634C0 11.2301 2.68629 13.9163 6 13.9163ZM6 4.74967C6.27614 4.74967 6.5 4.97353 6.5 5.24967V7.91634C6.5 8.19248 6.27614 8.41634 6 8.41634C5.72386 8.41634 5.5 8.19248 5.5 7.91634V5.24967C5.5 4.97353 5.72386 4.74967 6 4.74967Z"
				fill={color}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.16667 0.583008C4.16667 0.306865 4.39052 0.0830078 4.66667 0.0830078H7.33333C7.60948 0.0830078 7.83333 0.306865 7.83333 0.583008C7.83333 0.85915 7.60948 1.08301 7.33333 1.08301H4.66667C4.39052 1.08301 4.16667 0.85915 4.16667 0.583008Z"
				fill={color}
			/>
		</svg>
	);
};

export default TimeUsage;
