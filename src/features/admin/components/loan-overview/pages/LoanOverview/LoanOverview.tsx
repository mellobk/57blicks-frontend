import type { FC } from "react";
import { OverviewByInvestor } from "@/features/admin/components/loan-overview/components/OverviewByInvestor/OverviewByInvestor";
import { Overviews } from "@/features/admin/components/loan-overview/components/Overviews/Overviews";
import type { ILoanOverview } from "../../types/fields";

export const LoanOverview: FC = () => {
	const data: ILoanOverview = {
		principleOverview: {
			totalLoans: 368_000,
			loansDrawnDown: 368_000,
			dueToDraws: 0,
			checkAndBalance: 0,
		},
		trustAccountBalance: -40_000,
		interestOverview: {
			totalCollectibles: 0,
			totalParticipantsPayable: 2851.0958,
			servicingFee: 0,
			yieldSpread: 0,
			checkAndBalance: -2851.0958,
		},
		overviewByInvestors: [
			{
				name: "DKC Lending LLC",
				totalLoan: 0,
				totalDrawnToDate: 0,
				trustUnallocated: 0,
				trustAllocated: 0,
				dueToDraws: 0,
				totalFunds: 0,
				participants: [
					{
						name: "Homer Simpson",
						totalLoan: 0,
						totalDrawnToDate: 0,
						trustUnallocated: 0,
						trustAllocated: 0,
						dueToDraws: 0,
						totalFunds: 0,
					},
					{
						name: "pablo_Investor gomez_Investor",
						totalLoan: 0,
						totalDrawnToDate: 0,
						trustUnallocated: 0,
						trustAllocated: 0,
						dueToDraws: 0,
						totalFunds: 0,
					},
				],
			},
			{
				name: "DKC Lending FL",
				totalLoan: 0,
				totalDrawnToDate: 0,
				trustUnallocated: 0,
				trustAllocated: 0,
				dueToDraws: 0,
				totalFunds: 0,
				participants: [],
			},
			{
				name: "DKC Lending LC",
				totalLoan: 0,
				totalDrawnToDate: 0,
				trustUnallocated: 0,
				trustAllocated: 0,
				dueToDraws: 0,
				totalFunds: 0,
				participants: [],
			},
			{
				name: "DKC Lending IV",
				totalLoan: 0,
				totalDrawnToDate: 0,
				trustUnallocated: 0,
				trustAllocated: 0,
				dueToDraws: 0,
				totalFunds: 0,
				participants: [],
			},
			{
				name: "First Capital Trust",
				totalLoan: 0,
				totalDrawnToDate: 0,
				trustUnallocated: 0,
				trustAllocated: 0,
				dueToDraws: 0,
				totalFunds: 0,
				participants: [],
			},
		],
	};

	return (
		<>
			<div className="grid sm:grid-cols-1 md:grid-cols-12 xl:grid-cols-10 2xl:grid-cols-7 sm:gap-2 w-screen h-full">
				<div className="col-span-1 md:col-span-3 xl:col-span-2 2xl:col-span-1 flex flex-col gap-2 overflow-y-auto">
					<Overviews data={data} />
				</div>
				<div className="col-span-1 md:col-span-9 xl:col-span-8 2xl:col-span-6 rounded-2xl bg-white">
					<OverviewByInvestor data={data} />
				</div>
			</div>
		</>
	);
};
