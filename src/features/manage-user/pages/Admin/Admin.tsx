import { AdminTable } from "@/features/manage-user/components/AdminTable/AdminTable";

export const Admin: React.FC = () => {
	return (
		<div className="flex flex-col items-center  h-full w-full ">
			<AdminTable />
		</div>
	);
};
