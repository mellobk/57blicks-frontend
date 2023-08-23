import type * as React from "react";

type Props = {
	color?: string;
	width?: string;
};

const Notification: React.FC<Props> = ({
	color = "#BBBBBB",
	width = "48",
}: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 18 21"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M5.35179 18.7418C6.19288 19.811 7.51418 20.5 9 20.5C10.4858 20.5 11.8071 19.811 12.6482 18.7418C10.2264 19.07 7.77357 19.07 5.35179 18.7418Z"
				fill={color}
			/>
			<path
				d="M15.7491 7.5V8.2041C15.7491 9.04909 15.9903 9.87517 16.4422 10.5782L17.5496 12.3012C18.5612 13.8749 17.789 16.0139 16.0296 16.5116C11.4273 17.8134 6.57274 17.8134 1.97036 16.5116C0.211046 16.0139 -0.561177 13.8749 0.450359 12.3012L1.5578 10.5782C2.00972 9.87517 2.25087 9.04909 2.25087 8.2041V7.5C2.25087 3.63401 5.27256 0.5 9 0.5C12.7274 0.5 15.7491 3.63401 15.7491 7.5Z"
				fill={color}
			/>
		</svg>
	);
};

export default Notification;
