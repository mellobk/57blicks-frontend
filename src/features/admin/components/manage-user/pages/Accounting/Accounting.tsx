import { AccountingTable } from "@/features/admin/components/manage-user/components/AccountingTable/AccountingTable.tsx";
import type { FC } from "react";

export const Accounting: FC = () => {
	return (
		<div className="flex flex-col items-center h-full w-full">
			<AccountingTable />
		</div>
	);
};
