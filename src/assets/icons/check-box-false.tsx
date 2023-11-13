import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const CheckBoxFalse: FC<Props> = ({ color = "#BBBBBB", width = "10" }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={width}
			viewBox="0 0 10 11"
			fill="none"
		>
			<rect
				x="0.416667"
				y="0.416667"
				width="9.16667"
				height="9.16667"
				rx="4.58333"
				stroke={color}
				strokeWidth="0.833333"
			/>
		</svg>
	);
};

export default CheckBoxFalse;
