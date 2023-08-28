import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const ArrowDown: FC<Props> = ({ color = "#BBBBBB", width = "48" }: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 7 6"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M2.9345 5.31539C2.9055 5.28714 2.7815 5.18047 2.6795 5.0811C2.038 4.49854 0.988 2.97881 0.6675 2.18339C0.616 2.06259 0.507 1.75719 0.5 1.59401C0.5 1.43765 0.536 1.2886 0.609 1.14637C0.711 0.96907 0.8715 0.826839 1.061 0.748904C1.1925 0.698733 1.586 0.620799 1.593 0.620799C2.0235 0.542864 2.723 0.5 3.496 0.5C4.2325 0.5 4.9035 0.542864 5.3405 0.606673C5.3475 0.61398 5.8365 0.691914 6.004 0.777155C6.31 0.933512 6.5 1.23892 6.5 1.56576V1.59401C6.4925 1.80687 6.3025 2.25451 6.2955 2.25451C5.9745 3.00706 4.976 4.49172 4.3125 5.08841C4.3125 5.08841 4.142 5.25646 4.0355 5.32952C3.8825 5.4435 3.693 5.5 3.5035 5.5C3.292 5.5 3.095 5.43619 2.9345 5.31539Z"
				fill={color}
			/>
		</svg>
	);
};

export default ArrowDown;