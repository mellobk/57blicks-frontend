import type { FC } from "react";
import { DkcClTable } from "../../component/DkcClTable/DkcClTable";

export const DkcCl: FC = () => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full">
			<DkcClTable />
		</div>
	);
};
