import type { FC } from "react";

import { DkcFlTable } from "../../component/DkcFlTable/DkcFlTable";

export const DkcFl: FC = () => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full rounded-3xl">
			<DkcFlTable />
		</div>
	);
};
