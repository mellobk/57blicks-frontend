import type { FC } from "react";

export interface FooterTableProps {
	tabs?: Array<{ label: string; width: string; justify?: string }>;
}

export const FooterTable: FC<FooterTableProps> = ({ tabs }) => {
	return (
		<div
			className="flex bg-gray-200 h-[50px] w-[2040px] text-black text-[13px] rounded-b-2xl  bottom-0 "
			style={{
				zIndex: 10,
			}}
		>
			{tabs?.map((tab, key) => {
				return (
					<div
						key={key}
						style={{
							width: tab.width,
							justifyContent: tab.justify,
							padding: "0 16px",
						}}
						className="flex items-center  font-bold"
					>
						{tab.label}
					</div>
				);
			})}
		</div>
	);
};
