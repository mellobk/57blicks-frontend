import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const Credit: FC<Props> = ({ color = "#BBBBBB", width = "48" }: Props) => {
	return (
		<svg
			fill={color}
			width={width}
			height={width}
			viewBox="0 0 14 8"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13.3511 7.38545C13.3831 7.30737 13.3997 7.22545 13.3997 7.14225L13.3992 3.99985C13.3992 3.64593 13.1118 3.35985 12.7592 3.35985C12.4052 3.35985 12.1192 3.64657 12.1192 3.99985V5.59729L8.23692 1.71697C7.98732 1.46673 7.58214 1.46673 7.3319 1.71697L5.16681 3.88209L1.69225 0.404965C1.44201 0.154725 1.03689 0.154725 0.787289 0.404965C0.537049 0.653925 0.537049 1.05969 0.787289 1.30993L4.71433 5.23953C4.83465 5.35985 4.99721 5.42705 5.16681 5.42705C5.33705 5.42705 5.49958 5.35985 5.61926 5.23953L7.78438 3.07441L11.2142 6.50225H9.6174C9.26348 6.50225 8.9774 6.78833 8.9774 7.14225C8.9774 7.49617 9.26348 7.78225 9.6174 7.78225H12.7597C12.8423 7.78225 12.9249 7.76561 13.0023 7.73425C13.0804 7.70225 13.1515 7.65553 13.2123 7.59473C13.2724 7.53457 13.3192 7.46289 13.3511 7.38545Z"
				fill={color}
			/>
		</svg>
	);
};

export default Credit;