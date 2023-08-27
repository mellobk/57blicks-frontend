import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const Plus: FC<Props> = ({ color = "#BBBBBB", width = "48" }: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 13 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M6.5 0C6.9734 0 7.35714 0.38376 7.35714 0.857143V5.14286H11.6429C12.1163 5.14286 12.5 5.5266 12.5 6C12.5 6.4734 12.1163 6.85714 11.6429 6.85714H7.35714V11.1429C7.35714 11.6163 6.9734 12 6.5 12C6.0266 12 5.64286 11.6163 5.64286 11.1429V6.85714H1.35714C0.88376 6.85714 0.5 6.4734 0.5 6C0.5 5.5266 0.88376 5.14286 1.35714 5.14286H5.64286V0.857143C5.64286 0.38376 6.0266 0 6.5 0Z"
				fill={color}
			/>
		</svg>
	);
};

export default Plus;
