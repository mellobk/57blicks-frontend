import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const Permission: FC<Props> = ({ color = "#BBBBBB", width = "48" }: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M15.9466 13.0557V12.2447C15.9466 11.0277 15.0336 10.0137 13.8166 10.0137C12.6006 10.0137 11.6876 10.9257 11.6876 12.2447V13.0557C11.0786 13.2587 10.6736 13.9687 10.6736 14.5767V16.3007C10.6736 17.2137 11.4846 17.9237 12.2956 17.9237H15.5406C16.4536 17.9237 17.1636 17.2137 17.1636 16.3007V14.5767C17.0626 13.8667 16.5556 13.3597 15.9466 13.0557ZM13.8166 11.5347C14.2226 11.5347 14.4256 11.8387 14.4256 12.2447V12.9547H13.1076V12.2447C13.2086 11.8387 13.4116 11.5347 13.8166 11.5347Z"
				fill={color}
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M7.93529 0.0761719C10.5123 0.0761719 12.6003 2.16417 12.6003 4.74117C12.6003 7.3182 10.5123 9.4062 7.93529 9.4062C5.35827 9.4062 3.27027 7.3182 3.27027 4.74117C3.27027 2.16417 5.35827 0.0761719 7.93529 0.0761719Z"
				fill={color}
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M6.92119 11.4336C5.50118 11.4336 4.18318 11.6366 3.16918 11.9406C2.56018 12.1436 1.95218 12.4476 1.54618 12.8536C1.14118 13.2586 0.836182 13.8676 0.836182 14.5776C0.836182 15.2876 1.03918 15.7946 1.54618 16.3016C1.95218 16.7066 2.56018 17.0116 3.16918 17.2136C4.18318 17.5186 5.50118 17.7206 6.92119 17.7206C7.52919 17.7206 7.93519 17.3156 7.93519 16.7066V12.4476C7.93519 11.8396 7.52919 11.4336 6.92119 11.4336Z"
				fill={color}
			/>
		</svg>
	);
};

export default Permission;
