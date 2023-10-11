import { InvestorsTable } from "@/features/manage-user/components/InvestorsTable/InvestorsTable";
import { FC } from "react";

export const Investors: FC = () => {
	return (
		<div className="flex flex-col items-center h-full w-full">
			<InvestorsTable />
		</div>
	);
};
