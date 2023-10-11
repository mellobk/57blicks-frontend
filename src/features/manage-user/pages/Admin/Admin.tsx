import { AdminTable } from "@/features/manage-user/components/AdminTable/AdminTable";
import { FC } from "react";

export const Admin: FC = () => {
	return (
		<div className="flex flex-col items-center h-full w-full">
			<AdminTable />
		</div>
	);
};
