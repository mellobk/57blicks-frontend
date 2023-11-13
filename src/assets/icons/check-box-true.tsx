import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const CheckBoxTrue: FC<Props> = ({ color = "#B0B4BA", width = "10" }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={width}
			viewBox="0 0 10 10"
			fill="none"
		>
			<rect
				x="0.416667"
				y="0.416667"
				width="9.16667"
				height="9.16667"
				rx="4.58333"
				stroke="#B0B4BA"
				strokeWidth="0.833333"
			/>
			<circle cx="5.00016" cy="5.00001" r="1.66667" fill={color} />
		</svg>
	);
};

export default CheckBoxTrue;
