type Props = {
	color?: string;
	fill?: string;
	width?: string;
};

const Ok: React.FC<Props> = ({ color = "#BBBBBB", width = "48" }: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 13 9"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M11.5 0.890625L4.28125 8.10938L1 4.82812"
				stroke={color}
				stroke-width="1.125"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

export default Ok;
