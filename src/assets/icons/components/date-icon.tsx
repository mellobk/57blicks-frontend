import type { FC } from "react";

type Props = {
	color?: string;
	width?: number;
};

const DateIcon: FC<Props> = ({ color = "#BBBBBB", width = 48 }: Props) => {
	return (
		<svg
			fill={color}
			width={width}
			height={width}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M3,22H21a1,1,0,0,0,1-1V6a1,1,0,0,0-1-1H17V3a1,1,0,0,0-2,0V5H9V3A1,1,0,0,0,7,3V5H3A1,1,0,0,0,2,6V21A1,1,0,0,0,3,22ZM4,7H20v3H4Zm0,5H20v8H4Z" />
		</svg>
	);
};

export default DateIcon;
