type Props = {
	color?: string;
	fill?: string;
	width?: string;
	height?: number;
};

const LoadingIcon: React.FC<Props> = ({
	color = "#BBBBBB",
	width = "48",
}: Props) => {
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
				stroke-opacity="0.25"
				stroke-width="5.74359"
			/>
			<path
				d="M31.3939 8.60852C37.5112 8.56556 43.3948 10.9888 47.7503 15.3452C52.1058 19.7016 54.5766 25.6342 54.6189 31.838"
				stroke="url(#paint0_linear_3468_9118)"
				stroke-width="5.74359"
				stroke-linecap="round"
				stroke-dasharray="1.64 1.64"
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
					<stop offset="0.755208" stopColor={color} stop-opacity="0.01" />
					<stop offset="1" stopColor={color} stop-opacity="0" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default LoadingIcon;
