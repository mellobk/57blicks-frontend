import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const Open: FC<Props> = ({ color = "#BBBBBB", width = "48" }: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 22 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M9.00993 2H6.78194C3.84294 2 1.99994 4.081 1.99994 7.02601V14.974C1.99994 17.919 3.83394 20 6.78194 20H15.216C18.165 20 19.9999 17.919 19.9999 14.974V13.233M20.0002 6.843V2M20.0002 2H15.1572M20.0002 2L12.4502 9.54999"
				stroke={color}
				strokeWidth="2.53125"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default Open;
