import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const Bank: FC<Props> = ({ color = "#BBBBBB", width = "48" }: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 21 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M8.25 7C8.25 8.24264 9.25736 9.25 10.5 9.25C11.7426 9.25 12.75 8.24264 12.75 7C12.75 5.75736 11.7426 4.75 10.5 4.75C9.25736 4.75 8.25 5.75736 8.25 7Z"
				fill={color}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M2.27772 13.3259C3.28661 14 4.69108 14 7.5 14L13.5 14C16.3089 14 17.7134 14 18.7223 13.3259C19.159 13.034 19.534 12.659 19.8259 12.2223C20.5 11.2134 20.5 9.80892 20.5 7C20.5 4.19107 20.5 2.78661 19.8259 1.77772C19.534 1.34096 19.159 0.965955 18.7223 0.674121C17.7134 0 16.3089 0 13.5 0H7.5C4.69108 0 3.28661 0 2.27772 0.674122C1.84096 0.965956 1.46596 1.34096 1.17412 1.77772C0.5 2.78661 0.5 4.19108 0.5 7C0.5 9.80892 0.5 11.2134 1.17412 12.2223C1.46596 12.659 1.84096 13.034 2.27772 13.3259ZM10.5 10.75C8.42893 10.75 6.75 9.07107 6.75 7C6.75 4.92893 8.42893 3.25 10.5 3.25C12.5711 3.25 14.25 4.92893 14.25 7C14.25 9.07107 12.5711 10.75 10.5 10.75ZM4 10.75C3.58579 10.75 3.25 10.4142 3.25 10L3.25 4C3.25 3.58579 3.58579 3.25 4 3.25C4.41421 3.25 4.75 3.58579 4.75 4L4.75 10C4.75 10.4142 4.41421 10.75 4 10.75ZM16.25 10C16.25 10.4142 16.5858 10.75 17 10.75C17.4142 10.75 17.75 10.4142 17.75 10V4C17.75 3.58579 17.4142 3.25 17 3.25C16.5858 3.25 16.25 3.58579 16.25 4V10Z"
				fill={color}
			/>
		</svg>
	);
};

export default Bank;
