import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const UploadFile: FC<Props> = ({ color = "#BBBBBB", width = "48" }) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 12 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				id="Vector"
				d="M6.87678 0.5C7.05005 0.5 7.19559 0.647 7.19559 0.822V3.076C7.19559 4.357 8.2352 5.407 9.51044 5.414C10.0302 5.414 10.4461 5.421 10.7649 5.421C10.9798 5.421 11.3332 5.414 11.6312 5.414C11.8045 5.414 11.95 5.554 11.95 5.729V11.357C11.95 13.093 10.55 14.5 8.83124 14.5H3.32134C1.51243 14.5 0.0500488 13.023 0.0500488 11.203V3.657C0.0500488 1.921 1.44312 0.5 3.17579 0.5H6.87678ZM5.74708 5.218C5.67777 5.218 5.60846 5.232 5.54609 5.26C5.48371 5.288 5.42827 5.323 5.37975 5.372L3.39757 7.388C3.19658 7.591 3.19658 7.92 3.39757 8.123C3.59856 8.326 3.92431 8.326 4.1253 8.123L5.22728 7.003V10.384C5.22728 10.671 5.45599 10.902 5.74708 10.902C6.03124 10.902 6.25995 10.671 6.25995 10.384V7.003L7.36193 8.123C7.56292 8.326 7.88866 8.326 8.08965 8.123C8.29757 7.92 8.29757 7.591 8.09658 7.388L6.10747 5.372C6.05896 5.323 6.00351 5.288 5.94114 5.26C5.87876 5.232 5.81639 5.218 5.74708 5.218ZM8.20172 1.1342C8.20172 0.8325 8.5635 0.6827 8.77073 0.9004C9.52063 1.6872 10.8298 3.0627 11.5617 3.8313C11.7634 4.0434 11.6151 4.3955 11.3233 4.3962C10.7536 4.3983 10.0827 4.3962 9.59964 4.3913C8.83311 4.3913 8.20172 3.7536 8.20172 2.9794V1.1342Z"
				fill={color}
			/>
		</svg>
	);
};

export default UploadFile;
