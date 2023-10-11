import { AccountingTable } from "@/features/manage-user/components/AccountingTable/AccountingTable";
import type { FC } from "react";

export const Accounting: FC = () => {
	return (
		<div className="flex flex-col items-center h-full w-full">
			<AccountingTable />
		</div>
	);
};
