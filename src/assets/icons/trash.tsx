import type * as React from "react";

type Props = {
	color?: string;
	width?: string;
};

const Trash: React.FC<Props> = ({ color = "#BBBBBB", width = "48" }: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 15 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M13.0513 5.35771C13.2108 5.35771 13.3555 5.42731 13.4699 5.5449C13.5765 5.6705 13.6302 5.8265 13.6146 5.9913C13.6146 6.0457 13.1882 11.4376 12.9447 13.7072C12.7922 15.1 11.8944 15.9456 10.5476 15.9688C9.51199 15.992 8.49975 16 7.50308 16C6.44495 16 5.41015 15.992 4.4057 15.9688C3.10403 15.9376 2.2054 15.0768 2.06068 13.7072C1.81015 11.4296 1.39156 6.0457 1.38378 5.9913C1.376 5.8265 1.42891 5.6705 1.53628 5.5449C1.64209 5.42731 1.79459 5.35771 1.95487 5.35771H13.0513ZM9.15183 0C9.85907 0 10.4908 0.493595 10.6737 1.19759L10.8044 1.78158C10.9102 2.25758 11.3226 2.59437 11.7972 2.59437H14.1297C14.441 2.59437 14.7 2.85277 14.7 3.18157V3.48557C14.7 3.80636 14.441 4.07276 14.1297 4.07276H0.871132C0.559137 4.07276 0.300049 3.80636 0.300049 3.48557V3.18157C0.300049 2.85277 0.559137 2.59437 0.871132 2.59437H3.2037C3.67753 2.59437 4.08989 2.25758 4.19648 1.78238L4.31864 1.23679C4.50848 0.493595 5.13325 0 5.84827 0H9.15183Z"
				fill={color}
			/>
		</svg>
	);
};

export default Trash;
