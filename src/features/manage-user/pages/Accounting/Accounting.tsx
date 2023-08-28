import { AccountingTable } from "@/features/manage-user/components/AccountingTable/AccountingTable";

export const Accounting: React.FC = () => {
	return (
		<div className="flex flex-col items-center  h-full w-full ">
			<AccountingTable />
		</div>
	);
};
