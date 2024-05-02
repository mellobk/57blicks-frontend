import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
	fillColor?: string;
};

const Favorite: FC<Props> = ({ color = "#BBBBBB", width = "48" }) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 20 20"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
		>
			<g
				id="Free-Icons"
				stroke={color}
				stroke-width="1"
				fill="transparent"
				fill-rule="evenodd"
			>
				<g
					transform="translate(-377.000000, -156.000000)"
					id="Group"
					stroke={color}
				>
					<g transform="translate(375.000000, 154.000000)" id="Shape">
						<circle
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							cx="12"
							cy="12"
							r="9"
						></circle>
						<path
							d="M11.8981553,9.55678984 L13.0374283,11.2035047 L13.8960076,11.2035047 L12.8478352,12.6211403 L13.4093019,13.9312796 L11.9084042,13.4297151 L10.6849417,14.0414397 L11.1146331,12.4210055 L9.98071132,11.2871101 L11.1381283,11.0769928 L11.8981553,9.55678984 Z"
							stroke-width="2.4"
						></path>
					</g>
				</g>
			</g>
		</svg>
	);
};

export default Favorite;
