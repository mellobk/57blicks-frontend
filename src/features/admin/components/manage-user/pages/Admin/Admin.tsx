import { AdminTable } from "@/features/admin/components/manage-user/components/AdminTable/AdminTable";
import type { FC } from "react";

export const Admin: FC = () => {
	return (
		<div className="flex flex-col items-center h-full w-full">
			<AdminTable />
		</div>
	);
};
