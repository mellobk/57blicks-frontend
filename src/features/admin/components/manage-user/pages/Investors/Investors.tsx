import { InvestorsTable } from "@/features/admin/components/manage-user/components/InvestorsTable/InvestorsTable";
import type { FC } from "react";

export const Investors: FC = () => {
	return (
		<div className="flex flex-col items-center h-full w-full">
			<InvestorsTable />
		</div>
	);
};
