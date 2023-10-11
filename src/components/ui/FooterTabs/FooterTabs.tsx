import { FC } from "react";

export interface FooterTableProps {
	tabs?: Array<{ label: string; width: string; justify?: string }>;
}

export const FooterTable: FC<FooterTableProps> = ({ tabs }) => {
	return (
		<div
			className="flex  h-[40px]  w-full  text-black text-[13px] "
			style={{
				backgroundColor: "#edf3f5",
				borderBottomLeftRadius: "1.5rem",
				borderBottomRightRadius: "1.5rem",
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
