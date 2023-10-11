import type { FC } from "react";

type Props = {
	color?: string;
	width?: string;
};

const MenuTable: FC<Props> = ({ color = "#BBBBBB", width = "48" }: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 16 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M5.36559 1.15884C5.554 1.36072 5.54309 1.67711 5.34122 1.86553L2.48407 4.5322C2.38266 4.62685 2.24649 4.67511 2.10811 4.66546C1.96972 4.6558 1.84157 4.58909 1.75429 4.48127L0.944768 3.48127C0.77102 3.26664 0.804161 2.95179 1.01879 2.77805C1.23342 2.6043 1.54826 2.63744 1.72201 2.85207L2.19397 3.43507L4.6589 1.13447C4.86077 0.946057 5.17717 0.956967 5.36559 1.15884ZM7.50006 2.83334C7.50006 2.55719 7.72392 2.33334 8.00006 2.33334H14.6667C14.9429 2.33334 15.1667 2.55719 15.1667 2.83334C15.1667 3.10948 14.9429 3.33334 14.6667 3.33334H8.00006C7.72392 3.33334 7.50006 3.10948 7.50006 2.83334ZM5.36559 5.82551C5.554 6.02738 5.54309 6.34378 5.34122 6.5322L2.48407 9.19886C2.38266 9.29351 2.24649 9.34178 2.10811 9.33212C1.96972 9.32247 1.84157 9.25575 1.75429 9.14793L0.944768 8.14793C0.77102 7.9333 0.804161 7.61846 1.01879 7.44471C1.23342 7.27096 1.54826 7.30411 1.72201 7.51874L2.19397 8.10174L4.6589 5.80114C4.86077 5.61272 5.17717 5.62363 5.36559 5.82551ZM7.50006 7.5C7.50006 7.22386 7.72392 7 8.00006 7H14.6667C14.9429 7 15.1667 7.22386 15.1667 7.5C15.1667 7.77614 14.9429 8 14.6667 8H8.00006C7.72392 8 7.50006 7.77614 7.50006 7.5ZM5.36559 10.4922C5.554 10.6941 5.54309 11.0104 5.34122 11.1989L2.48407 13.8655C2.38266 13.9602 2.24649 14.0084 2.10811 13.9988C1.96972 13.9891 1.84157 13.9224 1.75429 13.8146L0.944768 12.8146C0.77102 12.6 0.804161 12.2851 1.01879 12.1114C1.23342 11.9376 1.54826 11.9708 1.72201 12.1854L2.19397 12.7684L4.6589 10.4678C4.86077 10.2794 5.17717 10.2903 5.36559 10.4922ZM7.50006 12.1667C7.50006 11.8905 7.72392 11.6667 8.00006 11.6667H14.6667C14.9429 11.6667 15.1667 11.8905 15.1667 12.1667C15.1667 12.4428 14.9429 12.6667 14.6667 12.6667H8.00006C7.72392 12.6667 7.50006 12.4428 7.50006 12.1667Z"
				stroke={color}
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default MenuTable;
