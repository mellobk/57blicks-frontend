import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
	height?: string;
};

const Refresh: FC<Props> = ({
	color = "#BBBBBB",
	width = "12",
	height = "12",
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.5933 2.95001C11.2553 2.80734 10.8627 2.96468 10.7193 3.30401L10.3787 4.11068C9.57401 2.14268 7.65401 0.777344 5.38935 0.777344C2.41733 0.777344 0 3.19468 0 6.16666C0 9.138 2.41733 11.5553 5.38935 11.5553C7.16401 11.5553 8.82468 10.6847 9.83135 9.22666C10.0407 8.92333 9.96468 8.508 9.66201 8.29933C9.35801 8.08933 8.94335 8.16533 8.73401 8.46866C7.97601 9.56666 6.72601 10.222 5.38935 10.222C3.15333 10.222 1.33333 8.40266 1.33333 6.16666C1.33333 3.93001 3.15333 2.11068 5.38935 2.11068C7.22001 2.11068 8.75268 3.29468 9.26601 4.95466L7.99935 4.41934C7.66201 4.27601 7.26935 4.43468 7.12601 4.77333C6.98268 5.11266 7.14068 5.504 7.48001 5.64666L9.81935 6.636C9.84868 6.65066 9.87668 6.664 9.90868 6.67333L10.0013 6.71333C10.086 6.74866 10.1747 6.766 10.2613 6.766C10.5213 6.766 10.768 6.61333 10.8753 6.35866L11.9473 3.82401C12.0907 3.48468 11.9327 3.09334 11.5933 2.95001Z"
				fill={color}
			/>
		</svg>
	);
};

export default Refresh;
