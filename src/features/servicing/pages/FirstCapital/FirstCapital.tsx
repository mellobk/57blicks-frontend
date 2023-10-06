import type { FC } from "react";
import { FirstCapitalTable } from "../../component/FirstCapital/FirstCapitalTable";

export const FirstCapital: FC = () => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full rounded-3xl">
			<FirstCapitalTable />
		</div>
	);
};
