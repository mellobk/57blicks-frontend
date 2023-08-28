import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const User: FC<Props> = ({ color = "#BBBBBB", width = "48" }: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 16 17"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M16 8.5C16 4.092 12.408 0.5 8 0.5C3.592 0.5 0 4.092 0 8.5C0 10.82 1 12.908 2.584 14.372C2.584 14.38 2.584 14.38 2.576 14.388C2.656 14.468 2.752 14.532 2.832 14.604C2.88 14.644 2.92 14.684 2.968 14.716C3.112 14.836 3.272 14.948 3.424 15.06C3.48 15.1 3.528 15.132 3.584 15.172C3.736 15.276 3.896 15.372 4.064 15.46C4.12 15.492 4.184 15.532 4.24 15.564C4.4 15.652 4.568 15.732 4.744 15.804C4.808 15.836 4.872 15.868 4.936 15.892C5.112 15.964 5.288 16.028 5.464 16.084C5.528 16.108 5.592 16.132 5.656 16.148C5.848 16.204 6.04 16.252 6.232 16.3C6.288 16.316 6.344 16.332 6.408 16.34C6.632 16.388 6.856 16.42 7.088 16.444C7.12 16.444 7.152 16.452 7.184 16.46C7.456 16.484 7.728 16.5 8 16.5C8.272 16.5 8.544 16.484 8.808 16.46C8.84 16.46 8.872 16.452 8.904 16.444C9.136 16.42 9.36 16.388 9.584 16.34C9.64 16.332 9.696 16.308 9.76 16.3C9.952 16.252 10.152 16.212 10.336 16.148C10.4 16.124 10.464 16.1 10.528 16.084C10.704 16.02 10.888 15.964 11.056 15.892C11.12 15.868 11.184 15.836 11.248 15.804C11.416 15.732 11.584 15.652 11.752 15.564C11.816 15.532 11.872 15.492 11.928 15.46C12.088 15.364 12.248 15.276 12.408 15.172C12.464 15.14 12.512 15.1 12.568 15.06C12.728 14.948 12.88 14.836 13.024 14.716C13.072 14.676 13.112 14.636 13.16 14.604C13.248 14.532 13.336 14.46 13.416 14.388C13.416 14.38 13.416 14.38 13.408 14.372C15 12.908 16 10.82 16 8.5ZM11.952 12.476C9.784 11.02 6.232 11.02 4.048 12.476C3.696 12.708 3.408 12.98 3.168 13.276C1.952 12.044 1.2 10.356 1.2 8.5C1.2 4.748 4.248 1.7 8 1.7C11.752 1.7 14.8 4.748 14.8 8.5C14.8 10.356 14.048 12.044 12.832 13.276C12.6 12.98 12.304 12.708 11.952 12.476Z"
				fill={color}
			/>
			<path
				d="M8 4.444C6.344 4.444 5 5.788 5 7.444C5 9.068 6.272 10.388 7.96 10.436C7.984 10.436 8.016 10.436 8.032 10.436C8.048 10.436 8.072 10.436 8.088 10.436C8.096 10.436 8.104 10.436 8.104 10.436C9.72 10.38 10.992 9.068 11 7.444C11 5.788 9.656 4.444 8 4.444Z"
				fill={color}
			/>
		</svg>
	);
};

export default User;