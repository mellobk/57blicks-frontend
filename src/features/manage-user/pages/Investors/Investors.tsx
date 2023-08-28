import { InvestorsTable } from "@/features/manage-user/components/InvestorsTable/InvestorsTable";

export const Investors: React.FC = () => {
	return (
		<div className="flex flex-col items-center  h-full w-full ">
			<InvestorsTable />
		</div>
	);
};
