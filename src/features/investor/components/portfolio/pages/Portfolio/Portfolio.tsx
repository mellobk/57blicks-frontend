import { type FC, useEffect, useState } from "react";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";

import InvestorsService from "@/api/investors";
import { Input } from "@/components/forms/Input";
import { BreadCrumb } from "@/components/ui/BreadCrumb";
import { Table } from "@/components/ui/Table";
import { Footer } from "@/features/investor/components/portfolio/components/Footer/Footer";
import { ParticipationBreakdown } from "@/types/api/paticipation-breakdown";
import { Loan } from "@/types/api/loan";
import { moneyFormat, percentageFormat } from "@/utils/formats";
import { getLoanColumns } from "@/utils/investors";
import userStore from "@/stores/user-store";

export const Portfolio: FC = () => {
	const [selectedLoan, setSelectedLoan] = useState<Loan>();
	const [searchValue, setSearchValue] = useState<string>("");
	const [searchVisible, setSearchVisible] = useState<boolean>(false);
	const currentMonthName = moment().format("MMMM");

  const userInfo = userStore((state) => state.loggedUserInfo);
  console.log(userInfo);

	const investorsQuery = useQuery(["investors-query"], () =>
		InvestorsService.getInvestorsWithLoans(searchValue)
	);

	useEffect(() => {
		setSelectedLoan(investorsQuery.data?.[0]);
	}, [investorsQuery.isSuccess]);

	const columns = [
		{
			name: "Investor",
			selector: (row: ParticipationBreakdown) =>
				`LLC / ${row.loan.collaterals?.[0]?.address || ""}`,
			sortable: true,
		},
		{
			name: "Total Loan Amount",
			selector: (row: ParticipationBreakdown) =>
				moneyFormat(Number(row.loan.totalLoanAmount)),
			sortable: true,
		},
		{
			name: "Investor Equity",
			selector: (row: ParticipationBreakdown) => moneyFormat(Number(row.amount)),
			sortable: true,
		},
		{
			name: "Rate",
			selector: (row: ParticipationBreakdown) => percentageFormat(Number(row.rate)),
			sortable: true,
		},
		{
			name: "Regular Payment",
			selector: (row: ParticipationBreakdown) => moneyFormat(Number(row.regular)),
			sortable: true,
		},
		{
			name: "Origin Date",
			selector: (row: ParticipationBreakdown) => row.loan?.originationDate?.toString() || "",
			sortable: true,
		},
		{
			name: "Maturity Date",
			selector: (row: ParticipationBreakdown) => row.loan?.maturityDate?.toString() || "",
			sortable: true,
		},
		{
			name: `${currentMonthName} (Current)`,
			selector: (row: ParticipationBreakdown) => moneyFormat(Number(row.regular)),
			sortable: true,
			conditionalCellStyles: [
				{
					when: (row: ParticipationBreakdown) => !!row,
					style: {
						background: "#C79E631F",
						color: "#C79E63",
					},
				},
			],
		},
	];

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
								right: "158px",
								width: "350px",
								zIndex: "0",
							}}
						>
							<div
								className={`${
									searchVisible || searchValue
										? "w-[200px] bg-transparent transition duration-500"
										: "bg-transparent  w-[30px] transition duration-500 "
								} `}
								onMouseEnter={() => setSearchVisible(true)}
								onMouseLeave={() => setSearchVisible(false)}
							>
								<Input
									type="text"
									value={searchValue}
									placeholder="Search"
									iconColor="white"
									iconWidth={`${searchValue ? "12" : "20"}`}
									iconName={`${searchValue ? "wrong" : "search"}`}
									onChange={(data) => setSearchValue(data.target.value)}
									clickIcon={() => setSearchValue("")}
									className={`placeholder-gray-400 text-white text-[13px] font-normal font-weight-400 leading-normal w-full ${
										searchVisible || searchValue
											? "bg-black-200  "
											: "bg-transparent "
									}  tracking-wide flex h-3 p-4 items-center self-stretch rounded-md border-none outline-none `}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col h-full gap-3 overflow-y-auto">
				<div
					className={`flex flex-col ${
						selectedLoan ? "h-[50%]" : "h-full"
					} bg-white rounded-2xl justify-between overflow-y-auto`}
				>
					<Table
						className="h-full p-0 m-0 rounded-t-2xl overflow-y-auto"
						columns={columns}
						data={selectedLoan?.participationBreakdowns || []}
						progressPending={investorsQuery.isFetching}
						fixedHeader
					/>
					<Footer data={selectedLoan?.participationBreakdowns || []} />
				</div>
				<Table
					className="flex flex-col h-[50%] bg-white rounded-2xl p-0 m-0 overflow-y-auto"
					columns={getLoanColumns()}
					data={selectedLoan?.participationBreakdowns || []}
					progressPending={investorsQuery.isFetching}
					fixedHeader
				/>
			</div>
		</div>
	);
};
