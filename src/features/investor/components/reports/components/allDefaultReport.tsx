/* eslint-disable @typescript-eslint/no-unsafe-call */
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
import { formatDate, moneyFormat } from "@/utils/formats";
import { downloadXLSX } from "@/utils/create-xlsx";
import { downloadCSV } from "@/utils/create-cvs";
import DataTable from "react-data-table-component";
import { Modal } from "@/components/ui/Modal";
import type { Loan } from "@/features/admin/components/servicing/types/api";
import Csv from "@/assets/images/png/Csv.png";
import Xlsx from "@/assets/images/png/Xlsx.png";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const AllDefaultReport: FC = () => {
	const [openInsurance, setOpenInsurance] = useState(false);
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

	const downloadReport = (): void => {
		const insuranceCsv = reportLoan.loans;

		const headerCsv = [
			"Borrower Entity",
			"Property Address",
			"Loan Amount",
			"Asset Type",
		];
		const csvData = insuranceCsv?.map((value: any) => {
			return [
				value.borrower?.llc,
				value?.borrower?.user.mailingAddress,
				moneyFormat(Number.parseInt(value?.totalLoanAmount)),
				formatDate(value?.originationDate.toString()),
				value?.collaterals[0]?.assetType,
			];
		});

		const data = [headerCsv, ...(csvData ?? [])];

		downloadCSV(data, "allLoans.csv");
	};

	const downloadXlsxReport = (): void => {
		const insuranceCsv = reportLoan.loans;

		const headerCsv = [
			"Borrower Entity",
			"Property Address",
			"Loan Amount",
			"Asset Type",
		];
		const csvData = insuranceCsv?.map((value: any) => {
			return [
				value.borrower?.llc,
				value?.borrower?.user.mailingAddress,
				moneyFormat(Number.parseInt(value?.totalLoanAmount)),
				formatDate(value?.originationDate.toString()),
				value?.collaterals[0]?.assetType,
			];
		});

		const data = [headerCsv, ...(csvData ?? [])];

		downloadXLSX(data, "allLoans.xlsx");
	};

	const columnsModal = [
		{
			name: "Borrower Entity",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.borrower?.llc || "",
			omit: false,
		},
		{
			name: "Property Address",
			selector: (row: Loan): string => row.collaterals[0]?.address || "",
			omit: false,
		},
		{
			name: "Loan Amount",
			selector: (row: Loan) =>
				moneyFormat(Number.parseInt(row?.totalLoanAmount)),
			omit: false,
		},
		{
			name: "Origination Date",
			selector: (row: Loan) => row?.originationDate,
			omit: false,
		},
		{
			name: "Asset Type",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.collaterals[0]?.assetType || "",
			omit: false,
		},
	];

	return (
		<div className="h-[25%] w-full flex gap-3 flex-wrap justify-center p-4">
			<div className="h-[70%] w-[45%] mb-9">
				<div className="flex items-center justify-between w-full px-10 bg-gray-200 p-3 g-3 relative">
					<div
						className="font-bold text-[13px] z-0"
						onClick={() => {
							setOpenInsurance(true);
						}}
					>
						Loans by Product
					</div>
					<div
						className="flex gap-2 ml-2 z-10 cursor-pointer"
						onClick={downloadReport}
					>
						<div className="w-[35px] h-[35px] bg-white flex items-center justify-center rounded-xl">
							<img src={Csv} alt="DKC Csv" />
						</div>

						<div
							className="w-[35px] h-[35px] bg-green-1100 flex items-center justify-center rounded-xl"
							onClick={downloadXlsxReport}
						>
							<img src={Xlsx} alt="DKC Xlsx" />
						</div>
					</div>
				</div>
				<PieCanvas data={chartData} />
			</div>
			<div className="h-[70%] w-[45%]">
				<div className="flex items-center justify-between w-full px-10 bg-gray-200 p-3 g-3 ">
					<div
						className="font-bold text-[13px]"
						onClick={() => {
							setOpenInsurance(true);
						}}
					>
						Loans by Asset Type
					</div>
					<div className="flex gap-2 ml-2" onClick={downloadReport}>
						<div className="w-[35px] h-[35px] bg-white flex items-center justify-center rounded-xl">
							<img src={Csv} alt="DKC Csv" />
						</div>

						<div
							className="w-[35px] h-[35px] bg-green-1100 flex items-center justify-center rounded-xl"
							onClick={downloadXlsxReport}
						>
							<img src={Xlsx} alt="DKC Xlsx" />
						</div>
					</div>
				</div>
				<PieCanvas data={chartAssetData} />
			</div>
			<div
				className="w-[20%] h-[50%] flex"
				onClick={() => {
					setOpenInsurance(true);
				}}
			>
				<ReportTable title="Number of Loans">
					<div>{reportLoan?.numbersOfLoans || 0}</div>
				</ReportTable>
			</div>
			<div
				className="w-[30%] h-[50%] flex"
				onClick={() => {
					setOpenInsurance(true);
				}}
			>
				<ReportTable title="Average Loan Amount">
					<div>{reportLoan?.averageLoanAmount || 0}</div>
				</ReportTable>
			</div>
			<div
				className="w-[20%] h-[50%] flex"
				onClick={() => {
					setOpenInsurance(true);
				}}
			>
				<ReportTable title="Interest Average">
					<div>{reportLoan?.interestData || 0}</div>
				</ReportTable>
			</div>
			<div
				className="w-[20%] h-[50%] flex"
				onClick={() => {
					setOpenInsurance(true);
				}}
			>
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

			<Modal
				visible={openInsurance}
				onHide={() => {
					setOpenInsurance(false);
				}}
				width="90vw"
				title="Default Loans"
			>
				<DataTable
					columns={columnsModal as any}
					data={reportLoan?.loans || []}
					progressPending={myData.isLoading}
				/>
			</Modal>
		</div>
	);
};
ManageInvestorReportsService;
