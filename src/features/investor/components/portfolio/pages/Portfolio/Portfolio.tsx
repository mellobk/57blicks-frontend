<<<<<<< Updated upstream
<<<<<<< Updated upstream
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { type FC, useEffect, useState } from "react";
import moment from "moment";
import { moneyFormat, percentageFormat } from "@/utils/formats";
import { BreadCrumb } from "@/components/ui/BreadCrumb";
import { Footer } from "@/features/investor/components/portfolio/components/Footer/Footer";
import InvestorsService from "@/api/investors";
import Loading from "@/assets/icons/loading";
import type { Loan } from "@/types/api/loan";
import PayablesInvestor from "./PayablesInvestor";
import { Table } from "@/components/ui/Table";
import YearPicker from "@/components/ui/YearPicker";
import { collateralsToString } from "@/utils/collateral-to-string";

import { useQuery } from "@tanstack/react-query";

export const Portfolio: FC = () => {
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const currentMonthName = moment().format("MMMM");

	const investorsQuery = useQuery(
		["loans-by-investors"],
		() => InvestorsService.getLoansByInvestor(),
		{
			enabled: false,
		}
	);

	const columns = [
		{
			name: "Investor",
			selector: (row: Loan) =>
				`LLC / ${collateralsToString(row.collaterals) || ""}`,
			sortable: true,
		},
		{
			name: "Total Loan Amount",
			selector: (row: Loan) => moneyFormat(Number(row.totalLoanAmount)),
			sortable: true,
		},
		{
			name: "Investor Equity",
			selector: (row: Loan) =>
				moneyFormat(Number(row.participationBreakdowns[0]?.amount || 0)),
			sortable: true,
		},
		{
			name: "Rate",
			selector: (row: Loan) =>
				percentageFormat(Number(row.participationBreakdowns[0]?.rate || 0)),
			sortable: true,
		},
		{
			name: "Regular Payment",
			selector: (row: Loan) =>
				moneyFormat(Number(row.participationBreakdowns[0]?.regular || 0)),
			sortable: true,
		},
		{
			name: "Origin Date",
			selector: (row: Loan) => row.originationDate?.toString() || "",
			sortable: true,
		},
		{
			name: "Maturity Date",
			selector: (row: Loan) => row.maturityDate?.toString() || "",
			sortable: true,
		},
		{
			name: `${currentMonthName} (Current)`,
			selector: (row: Loan) => {
				return moneyFormat(
					moment(row.originationDate).toDate().getMonth() ===
						new Date().getMonth()
						? Number(row.participationBreakdowns[0]?.prorated)
						: Number(row.participationBreakdowns[0]?.regular || 0)
				);
			},
			sortable: true,
			conditionalCellStyles: [
				{
					when: (row: Loan) => !!row,
					style: {
						background: "#C79E631F",
						color: "#C79E63",
					},
				},
			],
		},
	];

	useEffect(() => {
		investorsQuery.refetch();
	}, []);

	if (investorsQuery.isLoading) {
		<div className="flex flex-col rounded-3xl bg-white gap-6 divide-y divide-gray-200 w-screen p-6 h-full overflow-y-auto">
			<div className="flex flex-col w-full  items-center justify-items-center justify-center">
				<div>
					<Loading />
				</div>
				<div className="pt-6">Saving please wait...</div>
			</div>
		</div>;
	}

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex justify-between items-center w-full bg-primary-500 px-4 mb-2">
				<div className="relative w-[115px]">
					<div className="absolute w-[200px]" style={{ top: "-8px" }}>
						<BreadCrumb initialTab="Portfolio" actualTab="Your Portfolio" />
					</div>
				</div>
				<div
					className={`flex justify-end gap-2 items-center bg-primary-500 h-[50px]`}
					style={{ position: "relative", width: "180px" }}
				>
					<div
						className="flex justify-end gap-1 items-center"
						style={{ position: "absolute" }}
					>
						<div
							className="flex gap-2 justify-end"
							style={{
								position: "relative",
								right: "20px",
								width: "350px",
								zIndex: "0",
							}}
						>
							<YearPicker
								year={new Date().getFullYear()}
								onChange={(year: number) => {
									setYear(year);
								}}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col h-full gap-3 overflow-y-auto">
				<div
					className={`flex flex-col $  h-[50%] bg-white rounded-2xl justify-between overflow-y-auto`}
				>
					<Table
						className="h-full p-0 m-0 rounded-t-2xl overflow-y-auto"
						columns={columns}
						data={investorsQuery?.data || []}
						progressPending={investorsQuery.isFetching}
						fixedHeader
					/>
					<Footer data={investorsQuery?.data || []} />
				</div>
				<div
					className={`flex flex-col $  h-[50%] bg-white rounded-2xl justify-between overflow-y-auto`}
				>
					<PayablesInvestor year={year} loan={investorsQuery?.data} />
				</div>
			</div>
		</div>
	);
};
