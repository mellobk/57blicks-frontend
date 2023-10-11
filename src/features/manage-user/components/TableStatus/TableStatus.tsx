import { FC } from "react";

interface statusProps {
	className: string;
}

interface StatusMap {
	[key: string]: statusProps;
}

interface TableStatusProps {
	status: string;
}

export const TableStatus: FC<TableStatusProps> = ({ status }) => {
	const statusMap: StatusMap = {
		active: {
			className: "bg-green-800 text-green-700",
		},
		inactive: {
			className: "bg-red-700 text-red-800",
		},
	};

	return (
		<div
			className={` w-[53px] h-[24px] rounded-[12px] flex items-center justify-center text-[10px] ${statusMap[
				status?.toLocaleLowerCase()
			]?.className}`}
		>
			{status}
		</div>
	);
};
