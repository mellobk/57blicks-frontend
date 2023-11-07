import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const Debit: FC<Props> = ({ color = "#BBBBBB", width = "48" }) => {
	return (
		<svg
			fill={color}
			width={width}
			height={width}
			viewBox="0 0 13 8"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.8511 0.61406C12.8831 0.69214 12.8997 0.77406 12.8997 0.85726L12.8992 3.99966C12.8992 4.35358 12.6118 4.63966 12.2592 4.63966C11.9052 4.63966 11.6192 4.35294 11.6192 3.99966V2.40222L7.73692 6.28255C7.48732 6.53279 7.08214 6.53279 6.8319 6.28255L4.66681 4.11742L1.19225 7.59455C0.942009 7.84479 0.536889 7.84479 0.287289 7.59455C0.0370494 7.34559 0.0370494 6.93983 0.287289 6.68959L4.21433 2.75998C4.33465 2.63966 4.49721 2.57246 4.66681 2.57246C4.83705 2.57246 4.99958 2.63966 5.11926 2.75998L7.28438 4.9251L10.7142 1.49726H9.1174C8.76348 1.49726 8.4774 1.21118 8.4774 0.85726C8.4774 0.50334 8.76348 0.21726 9.1174 0.21726H12.2597C12.3423 0.21726 12.4249 0.2339 12.5023 0.26526C12.5804 0.29726 12.6515 0.34398 12.7123 0.40478C12.7724 0.464941 12.8192 0.53662 12.8511 0.61406Z"
				fill={color}
			/>
		</svg>
	);
};

export default Debit;
