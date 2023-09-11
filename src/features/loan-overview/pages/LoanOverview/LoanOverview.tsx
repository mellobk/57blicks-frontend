import { FC } from "react";
import { OverviewByInvestor } from "@/features/loan-overview/components/OverviewByInvestor/OverviewByInvestor";
import { Overviews } from "@/features/loan-overview/components/Overviews/Overviews";
import { LoanOverviewFields } from "@/features/loan-overview/types/fields";

export const LoanOverview: FC = () => {
	const data: LoanOverviewFields = {
		checkAndBalanceInterest: 0,
		checkAndBalancePrinciple: 0,
		dueToDrawDetails: [
			{
				amountOwed: 4200,
				lender: "Lender Name",
				loanName: "Some Name",
				loanAddress: "Some Address",
			},
			{
				amountOwed: 4200,
				lender: "Lender Name",
				loanName: "Some Name",
				loanAddress: "Some Address",
			},
			{
				amountOwed: 4200,
				lender: "Lender Name",
				loanName: "Some Name",
				loanAddress: "Some Address",
			},
			{
				amountOwed: 4200,
				lender: "Lender Name",
				loanName: "Some Name",
				loanAddress: "Some Address",
			},
			{
				amountOwed: 4200,
				lender: "Lender Name",
				loanName: "Some Name",
				loanAddress: "Some Address",
			},
			{
				amountOwed: 4200,
				lender: "Lender Name",
				loanName: "Some Name",
				loanAddress: "Some Address",
			},
		],
		dueToDraws: 774500,
		fundingBreakdown: [
			{
				dueToDraws: 0,
				lender: "DKC Lending LLC",
				participants: [
					{
						dueToDraws: 0,
						lender: "Scott Harper",
						totalDrawn: 178000,
						totalFunds: 178000,
						totalLoan: 178000,
						trustUnallocated: 0,
						trustAllocated: 0,
					},
					{
						dueToDraws: 0,
						lender: "Chad Ricketts",
						totalDrawn: 178000,
						totalFunds: 178000,
						totalLoan: 178000,
						trustUnallocated: 0,
						trustAllocated: 0,
					},
				],
				totalDrawn: 178000,
				totalFunds: 178000,
				totalLoan: 178000,
				trustUnallocated: 0,
				trustAllocated: 0,
			},
			{
				dueToDraws: 0,
				lender: "DKC Lending FL LLC",
				totalDrawn: 178000,
				totalFunds: 178000,
				totalLoan: 178000,
				trustUnallocated: 0,
				trustAllocated: 0,
			},
			{
				dueToDraws: 0,
				lender: "DKC Lending IV",
				totalDrawn: 178000,
				totalFunds: 178000,
				totalLoan: 178000,
				trustUnallocated: 0,
				trustAllocated: 0,
			},
		],
		loansDrawnDown: 37837000,
		servicingFee: 24929.94,
		totalCollectibles: 407684.33,
		totalLoans: 38612000,
		totalParticipantsPayable: 375945.22,
		trustAccountBalance: 406500,
		yieldSpread: 6809.17,
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
