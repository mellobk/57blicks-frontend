import type { FC } from "react";
import { DkcIvTable } from "../../component/DkcIv/DkcIvTable";

export const DkcIv: FC = () => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full rounded-3xl">
			<DkcIvTable />
		</div>
	);
};
