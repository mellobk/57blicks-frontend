import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const TrashBin: FC<Props> = ({ color = "#BBBBBB", width = "48" }: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 25 24"
			fill={color}
			xmlns="http://www.w3.org/2000/svg"
		>
      <path
        d="M3.25 6.16667C3.25 5.70644 3.59538 5.33335 4.02143 5.33335L6.68567 5.3329C7.21502 5.31841 7.68202 4.95482 7.86214 4.41691C7.86688 4.40277 7.87232 4.38532 7.89185 4.32203L8.00665 3.94993C8.0769 3.72179 8.1381 3.52303 8.22375 3.34536C8.56209 2.64349 9.18808 2.1561 9.91147 2.03132C10.0946 1.99973 10.2885 1.99987 10.5111 2.00002H13.9891C14.2117 1.99987 14.4056 1.99973 14.5887 2.03132C15.3121 2.1561 15.9381 2.64349 16.2764 3.34536C16.3621 3.52303 16.4233 3.72179 16.4935 3.94993L16.6083 4.32203C16.6279 4.38532 16.6333 4.40277 16.638 4.41691C16.8182 4.95482 17.3778 5.31886 17.9071 5.33335H20.4786C20.9046 5.33335 21.25 5.70644 21.25 6.16667C21.25 6.62691 20.9046 7 20.4786 7H4.02143C3.59538 7 3.25 6.62691 3.25 6.16667Z"
        fill={color}/>
      <path
        d="M12.1068 21.9998H12.8937C15.6012 21.9998 16.9549 21.9998 17.8351 21.1366C18.7153 20.2734 18.8054 18.8575 18.9855 16.0256L19.245 11.945C19.3427 10.4085 19.3916 9.6402 18.95 9.15335C18.5084 8.6665 17.7628 8.6665 16.2714 8.6665H8.72905C7.23771 8.6665 6.49204 8.6665 6.05047 9.15335C5.60891 9.6402 5.65777 10.4085 5.75549 11.945L6.015 16.0256C6.1951 18.8575 6.28515 20.2734 7.16534 21.1366C8.04553 21.9998 9.39927 21.9998 12.1068 21.9998Z"
        fill={color}/>
		</svg>
	);
};

export default TrashBin;
