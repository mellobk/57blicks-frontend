import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const Pencil: FC<Props> = ({ color = "#BBBBBB", width = "48" }) => {
	return (
		<svg
			fill={color}
			width={width}
			height={width}
			viewBox="0 0 11 14"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8.25107 3.84118L7.01827 5.60118C6.90147 5.76838 6.71587 5.85718 6.52627 5.85718C6.40707 5.85718 6.28707 5.82198 6.18307 5.74838C5.91107 5.55798 5.84547 5.18438 6.03507 4.91318L7.26787 3.15318C7.45827 2.88118 7.83347 2.81558 8.10387 3.00598C8.37507 3.19558 8.44147 3.56998 8.25107 3.84118ZM9.49587 1.11638C8.22067 0.22358 6.46387 0.53478 5.57347 1.81078L0.887075 8.52598C0.491075 9.10998 0.287875 9.80198 0.304675 10.5076C0.325475 11.3436 0.479075 12.9164 0.988675 13.2628C1.49827 13.6092 2.98307 13.2508 3.74627 13.0156C4.47907 12.7892 5.11347 12.3212 5.54467 11.6868L10.1895 5.03238C11.0775 3.75878 10.7671 2.00678 9.49587 1.11638Z"
				fill={color}
			/>
		</svg>
	);
};

export default Pencil;
