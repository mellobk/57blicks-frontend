import type * as React from "react";

type Props = {
	color?: string;
	width?: string;
};

const DeleteBack: React.FC<Props> = ({
	color = "#BBBBBB",
	width = "48",
}: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 15 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.08068 10.9989C4.70048 11.3332 5.44297 11.3332 6.92795 11.3332H8.68589C11.2695 11.3332 12.5613 11.3332 13.364 10.5521C14.1666 9.77107 14.1666 8.514 14.1666 5.99984C14.1666 3.48568 14.1666 2.2286 13.364 1.44755C12.5613 0.666504 11.2695 0.666504 8.68589 0.666504H6.92795C5.44297 0.666504 4.70048 0.666504 4.08068 1.00079C3.46088 1.33508 3.06736 1.94778 2.28033 3.17318L1.82646 3.87984C1.16432 4.91078 0.833252 5.42625 0.833252 5.99984C0.833252 6.57343 1.16432 7.0889 1.82646 8.11983L2.28033 8.8265C3.06736 10.0519 3.46088 10.6646 4.08068 10.9989ZM6.85346 3.97962C6.6582 3.78436 6.34161 3.78436 6.14635 3.97962C5.95109 4.17488 5.95109 4.49146 6.14635 4.68672L7.45947 5.99985L6.14637 7.31295C5.9511 7.50821 5.9511 7.8248 6.14637 8.02006C6.34163 8.21532 6.65821 8.21532 6.85347 8.02006L8.16658 6.70695L9.47967 8.02004C9.67493 8.21531 9.99152 8.21531 10.1868 8.02004C10.382 7.82478 10.382 7.5082 10.1868 7.31294L8.87368 5.99985L10.1868 4.68674C10.3821 4.49148 10.3821 4.17489 10.1868 3.97963C9.99153 3.78437 9.67495 3.78437 9.47968 3.97963L8.16658 5.29274L6.85346 3.97962Z"
				fill={color}
			/>
		</svg>
	);
};

export default DeleteBack;
