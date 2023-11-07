import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const Loading: FC<Props> = ({ color = "#BBBBBB", width = "48" }) => {
	return (
		<svg
			className="animate-spin "
			width={width}
			height={width}
			viewBox={`0 0 64 64`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<ellipse
				cx="31.5542"
				cy="32"
				rx="23.0659"
				ry="23.392"
				stroke={color}
				strokeOpacity="0.25"
				strokeWidth="5.74359"
			/>
			<path
				d="M31.3939 8.60852C37.5112 8.56556 43.3948 10.9888 47.7503 15.3452C52.1058 19.7016 54.5766 25.6342 54.6189 31.838"
				stroke="url(#paint0_linear_3468_9118)"
				strokeWidth="5.74359"
				strokeLinecap="round"
				strokeDasharray="1.64 1.64"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_3468_9118"
					x1="51.4665"
					y1="43.8055"
					x2="11.3578"
					y2="20.6852"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor={color} />
					<stop offset="0.755208" stopColor={color} stopOpacity="0.01" />
					<stop offset="1" stopColor={color} stopOpacity="0" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default Loading;
