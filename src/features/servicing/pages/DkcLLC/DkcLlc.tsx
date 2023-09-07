import type { FC } from "react";
import { DkcLlcTable } from "../../component/DkcLlcTable/DkcLlcTable";

export const DkcLlc: FC = () => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full">
			<DkcLlcTable />
		</div>
	);
};
