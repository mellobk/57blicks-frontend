import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const Chart: FC<Props> = ({ color = "#BBBBBB", width = "48" }: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8.00029 7.48096C7.27645 7.48096 6.68701 8.06976 6.68701 8.7936V12.768C6.68701 13.4912 7.27645 14.08 8.00029 14.08C8.72413 14.08 9.31357 13.4912 9.31357 12.768V8.7936C9.31357 8.06976 8.72413 7.48096 8.00029 7.48096Z"
				fill={color}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3.2332 4.30078C2.50936 4.30078 1.91992 4.88958 1.91992 5.61278V12.768C1.91992 13.4912 2.50936 14.08 3.2332 14.08C3.95768 14.08 4.54648 13.4912 4.54648 12.768V5.61278C4.54648 4.88958 3.95768 4.30078 3.2332 4.30078Z"
				fill={color}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.7671 1.91992C12.0427 1.91992 11.4539 2.50872 11.4539 3.23192V12.7679C11.4539 13.4911 12.0427 14.0799 12.7671 14.0799C13.491 14.0799 14.0804 13.4911 14.0804 12.7679V3.23192C14.0804 2.50872 13.491 1.91992 12.7671 1.91992Z"
				fill="#00BA35"
			/>
		</svg>
	);
};

export default Chart;
