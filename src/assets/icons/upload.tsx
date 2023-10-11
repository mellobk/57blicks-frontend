import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const Upload: FC<Props> = ({ color = "#BBBBBB", width = "48" }: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.99967 10.5C8.27582 10.5 8.49967 10.2762 8.49967 10V2.68497L9.62005 3.99207C9.79976 4.20174 10.1154 4.22602 10.3251 4.04631C10.5347 3.86659 10.559 3.55094 10.3793 3.34128L8.3793 1.00795C8.28431 0.897125 8.14564 0.833344 7.99968 0.833344C7.85371 0.833344 7.71504 0.897125 7.62005 1.00795L5.62005 3.34128C5.44034 3.55094 5.46462 3.86659 5.67428 4.04631C5.88394 4.22602 6.19959 4.20174 6.3793 3.99207L7.49968 2.68497L7.49967 10C7.49967 10.2762 7.72353 10.5 7.99967 10.5Z"
				fill={color}
			/>
			<path
				d="M10.6663 6.00001C10.1982 6.00001 9.96415 6.00001 9.79601 6.11235C9.7232 6.161 9.66069 6.22351 9.61204 6.29632C9.4997 6.46446 9.4997 6.69852 9.4997 7.16665L9.4997 10C9.4997 10.8284 8.82813 11.5 7.9997 11.5C7.17127 11.5 6.4997 10.8284 6.4997 10L6.4997 7.16671C6.4997 6.69852 6.4997 6.46443 6.38734 6.29628C6.3387 6.2235 6.27621 6.16101 6.20343 6.11238C6.03528 6.00001 5.80119 6.00001 5.33301 6.00001C3.44739 6.00001 2.50458 6.00001 1.91879 6.5858C1.33301 7.17158 1.33301 8.11424 1.33301 9.99986V10.6665C1.33301 12.5521 1.33301 13.495 1.91879 14.0807C2.50458 14.6665 3.44739 14.6665 5.33301 14.6665H10.6663C12.552 14.6665 13.4948 14.6665 14.0806 14.0807C14.6663 13.495 14.6663 12.5521 14.6663 10.6665V9.99986C14.6663 8.11425 14.6663 7.17158 14.0806 6.5858C13.4948 6.00001 12.552 6.00001 10.6663 6.00001Z"
				fill={color}
			/>
		</svg>
	);
};

export default Upload;
