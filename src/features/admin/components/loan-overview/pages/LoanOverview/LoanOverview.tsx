import type { FC } from "react";
import { OverviewByInvestor } from "@/features/admin/components/loan-overview/components/OverviewByInvestor/OverviewByInvestor";
import { Overviews } from "@/features/admin/components/loan-overview/components/Overviews/Overviews";
import Loading from "@/assets/icons/loading";

import { getLoanOverview } from "../../api/loan-overview";
import { useQuery } from "@tanstack/react-query";

export const LoanOverview: FC = () => {
	const { data, isLoading } = useQuery(["loanOverview"], getLoanOverview);

	console.log(data);

	if (isLoading)
		return (
			<div className="flex flex-col rounded-3xl bg-white gap-6 divide-y divide-gray-200 w-screen p-6 h-full overflow-y-auto">
				<div className="flex flex-col w-full  items-center justify-items-center justify-center">
					<div>
						<Loading />
					</div>
				</div>
			</div>
		);

	return (
		<>
			<div className="grid sm:grid-cols-1 md:grid-cols-12 xl:grid-cols-10 2xl:grid-cols-7 sm:gap-2 w-screen h-full">
				<div className="col-span-1 md:col-span-3 xl:col-span-2 2xl:col-span-1 flex flex-col gap-2 overflow-y-auto">
					{data && <Overviews data={data} />}
				</div>
				<div className="col-span-1 md:col-span-9 xl:col-span-8 2xl:col-span-6 rounded-2xl bg-white">
					{data && <OverviewByInvestor data={data.overviewByInvestors} />}
				</div>
			</div>
		</>
	);
};
