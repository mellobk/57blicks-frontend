import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const LinkCopy: FC<Props> = ({ color = "#BBBBBB", width = "48" }: Props) => {
	return (
		<svg
			fill={color}
			width={width}
			height={width}
			viewBox="0 0 22 14"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M7 1.75C4.10051 1.75 1.75 4.10051 1.75 7C1.75 9.8995 4.10051 12.25 7 12.25H8C8.41421 12.25 8.75 12.5858 8.75 13C8.75 13.4142 8.41421 13.75 8 13.75H7C3.27208 13.75 0.25 10.7279 0.25 7C0.25 3.27208 3.27208 0.25 7 0.25H8C8.41421 0.25 8.75 0.585786 8.75 1C8.75 1.41421 8.41421 1.75 8 1.75H7Z"
				fill={color}
			/>
			<path
				d="M7.24991 6.99995C7.24991 6.58573 7.58569 6.24995 7.99991 6.24995H13.9999C14.4141 6.24995 14.7499 6.58573 14.7499 6.99995C14.7499 7.41416 14.4141 7.74995 13.9999 7.74995H7.99991C7.58569 7.74995 7.24991 7.41416 7.24991 6.99995Z"
				fill={color}
			/>
			<path
				d="M14 0.25C13.5858 0.25 13.25 0.585786 13.25 1C13.25 1.41421 13.5858 1.75 14 1.75H15C17.8995 1.75 20.25 4.10051 20.25 7C20.25 9.8995 17.8995 12.25 15 12.25H14C13.5858 12.25 13.25 12.5858 13.25 13C13.25 13.4142 13.5858 13.75 14 13.75H15C18.7279 13.75 21.75 10.7279 21.75 7C21.75 3.27208 18.7279 0.25 15 0.25H14Z"
				fill={color}
			/>
		</svg>
	);
};

export default LinkCopy;