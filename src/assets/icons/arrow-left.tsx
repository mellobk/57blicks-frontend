import { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const ArrowLeft: FC<Props> = ({ color = "#BBBBBB", width = "48" }: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 6 11"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3.14713e-05 5.5C3.14713e-05 5.30798 0.0735321 5.11603 0.219745 4.96975L4.71961 0.469929C5.01285 0.17669 5.48683 0.17669 5.78007 0.469929C6.07331 0.763168 6.07331 1.23715 5.78007 1.53039L1.81049 5.5L5.78007 9.46959C6.07331 9.76287 6.07331 10.2368 5.78007 10.5301C5.48683 10.8233 5.01285 10.8233 4.71961 10.5301L0.219745 6.03025C0.0735321 5.88397 3.14713e-05 5.69202 3.14713e-05 5.5Z"
				fill={color}
			/>
		</svg>
	);
};

export default ArrowLeft;
