/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, type FC, useEffect } from "react";

// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { useMutation } from "@tanstack/react-query";
import ManageInvestorReportsService from "../api/reports";
import userStore from "@/stores/user-store";
import ReportTable from "@/features/admin/components/reports/components/ReportComponent/ReportComponent";
import { PieCanvas } from "@/features/admin/components/reports/components/PieCanvas/PieCanvas";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const AllDefaultReport: FC = () => {
	const userInfo = userStore((state) => state.loggedUserInfo);
	const [reportLoan, setReportLoan] = useState<any>();
	const [chartData, setChartData] = useState([]);
	const [chartAssetData, setAssetChartData] = useState([]);
	const myData = useMutation(async () => {
		return ManageInvestorReportsService.getInvestorsReportLoan(
			userInfo.investor?.id || ""
		);
	});

	useEffect(() => {
		/* console.log(investorsQuery.data?.[0]);
		setSelectedLoan(); */
		if (myData.isSuccess) {
			setReportLoan(myData.data as any);

			const getData =
				(myData?.data?.loanProduct as unknown as Array<any>) || [];
			const keyProductValues = Object.keys(getData);

			/* 	console.log(keyProductValues); */

			const data = keyProductValues.map((value) => {
				return {
					id: `${value} `,
					label: `${value} `,
					value: getData[value as any].length,
					color: "hsl(110, 70%, 50%)",
				};
			});
			setChartData(data as any);

			const getDataAsset =
				(myData?.data?.loanAsset as unknown as Array<any>) || [];
			const keyAssetValues = Object.keys(getDataAsset);

			/* 	console.log(keyProductValues); */

			const dataAsset = keyAssetValues.map((value) => {
				return {
					id: `${value} `,
					label: `${value} `,
					value: getDataAsset[value as any].length,
					color: "hsl(110, 70%, 50%)",
				};
			});
			setAssetChartData(dataAsset as any);

			/* 		const object: Record<string, any> = {};


			const data = keyAssetValues.map((value) => {
				return {
					id: `${value} `,
					label: `${value} `,
					value: object[value as string],
					color: "hsl(110, 70%, 50%)",
				};
			});
			setChartData(data as any); */
		}
	}, [myData.data]);

	useEffect(() => {
		if (userInfo.investor?.id) {
			myData.mutate();
		}
	}, [userInfo]);

	return (
		<div className="h-[25%] w-full flex gap-3 flex-wrap justify-center p-4">
			<div className="h-[70%] w-[45%] mb-7">
				<div className="flex items-center justify-between w-full px-10 bg-gray-200 p-3 g-3 ">
					<div className="font-bold text-[13px]">Loans by Product</div>
				</div>
				<PieCanvas data={chartData} />
			</div>
			<div className="h-[70%] w-[45%]">
				<div className="flex items-center justify-between w-full px-10 bg-gray-200 p-3 g-3 ">
					<div className="font-bold text-[13px]">Loans by Asset Type</div>
				</div>
				<PieCanvas data={chartAssetData} />
			</div>
			<div className="w-[20%] h-[50%] flex">
				<ReportTable title="Number of Loans">
					<div>{reportLoan?.numbersOfLoans || 0}</div>
				</ReportTable>
			</div>
			<div className="w-[30%] h-[50%] flex">
				<ReportTable title="Average Loan Amount">
					<div>{reportLoan?.averageLoanAmount || 0}</div>
				</ReportTable>
			</div>
			<div className="w-[20%] h-[50%] flex">
				<ReportTable title="Interest Average">
					<div>{reportLoan?.interestData || 0}</div>
				</ReportTable>
			</div>
			<div className="w-[20%] h-[50%] flex">
				<ReportTable title="Roll Rate">
					<div>{reportLoan?.rollRate || 0}</div>
				</ReportTable>
			</div>

			<div className="w-[20%] h-[50%] flex">
				<ReportTable title="My Investments">
					<div className="w-[80%] flex items-center justify-center gap-3">
						<span className=" text-[35px]">
							{reportLoan?.investorInvestments?.myInvestment || 0}
						</span>{" "}
						<span className="text-[20px] text-gray-40">/</span>
						<span className="text-[20px] text-gray-40">{` ${
							reportLoan?.investorInvestments?.totalInvestment || 0
						}`}</span>
					</div>
				</ReportTable>
			</div>
		</div>
	);
};
ManageInvestorReportsService;
