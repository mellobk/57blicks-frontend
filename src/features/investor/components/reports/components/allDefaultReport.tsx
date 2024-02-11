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
import { moneyFormat } from "@/utils/formats";
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
	const [lastRowModal, setLastRowModal] = useState<Array<any>>([]);
	const [modalColumnsData, setModalColumnsData] = useState<Array<any>>([]);
	const myData = useMutation(async () => {
		return ManageInvestorReportsService.getInvestorsReportLoan(
			userInfo?.id || ""
		);
	});

	useEffect(() => {
		/* console.log(investorsQuery.data?.[0]);
		setSelectedLoan(); */

		if (myData.isSuccess) {
			setReportLoan(myData.data as any);

			console.log(myData.data);
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

			if (reportLoan?.loans) {
				const insuranceCsv = reportLoan?.loans;

				const totalLoansAmount = insuranceCsv.reduce(
					(accumulator: number, dataInterest: { totalLoanAmount: string }) =>
						accumulator + Number.parseFloat(dataInterest.totalLoanAmount),
					0
				);

				const lastRow = [
					"",
					"",
					moneyFormat(Number.parseInt(totalLoansAmount)).replaceAll(",", "."),
					"",
					"",
					"",
				];
				setModalColumnsData([
					...insuranceCsv,
					{
						totalLoanAmount: totalLoansAmount.toString(),
						ltv: 0,
						collaterals: [
							{
								address: "",
								taxUrl: "",
								insuranceExpirationDate: "2023-12-11",
							},
						],
						borrower: {
							llc: "",
							user: {
								email: "",
								phoneNumber: "",
								mailingAddress: "",
								isActive: true,
							},
						},
						totalDebits: "0",
						creditAverage: "201249.32",
						debitAverage: "250.00",
					},
				]);
				setLastRowModal(lastRow);
			}
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
			"Default Type",
			"LTV",
			"Phone #",
			"Email",
		];
		const csvData = insuranceCsv?.map((data: any) => {
			return [
				data.borrower?.llc,
				data?.borrower?.user.mailingAddress?.replaceAll(",", " "),
				moneyFormat(Number.parseInt(data?.totalLoanAmount)).replaceAll(
					",",
					"."
				),
				data?.defaultType,
				data?.ltv,
				data?.borrower?.user.phoneNumber,
				data?.borrower?.user.email,
			];
		});

		const data = [headerCsv, ...(csvData ?? []), lastRowModal];

		downloadCSV(data, "All Loans.csv");
	};

	const downloadXlsxReport = (): void => {
		const insuranceCsv = reportLoan.loans;

		const headerCsv = [
			"Borrower Entity",
			"Property Address",
			"Loan Amount",
			"Default Type",
			"LTV",
			"Phone #",
			"Email",
		];
		const csvData = insuranceCsv?.map((data: any) => {
			return [
				data.borrower?.llc,
				data?.borrower?.user.mailingAddress,
				moneyFormat(Number.parseInt(data?.totalLoanAmount)),
				data?.defaultType,
				data?.ltv,
				data?.borrower?.user.phoneNumber,
				data?.borrower?.user.email,
			];
		});

		const data = [headerCsv, ...(csvData ?? []), lastRowModal];

		void downloadXLSX(data, "All Loans.xlsx");
	};

	const columns = [
		{
			name: "Borrower Entity",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.borrower?.llc || "",
			omit: false,
		},
		{
			name: "Loan Amount",
			selector: (row: Loan) =>
				moneyFormat(Number.parseInt(row?.totalLoanAmount)),
			omit: false,
		},
		{
			name: "Phone #",
			selector: (row: Loan) => row?.borrower?.user.phoneNumber || "",
			omit: false,
		},
		{
			name: "Email",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.borrower?.user.email || "",
			omit: false,
		},
	];

	const columnsModal = [
		{
			name: "Borrower Entity",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.borrower?.llc || "",
			omit: false,
			maxWidth: "250px",
		},
		{
			name: "Property Address",
			selector: (row: Loan) => (
				<div className=" w-[290px] break-words whitespace-normal p-2">
					{row?.collaterals[0]?.address || ""}
				</div>
			),
			omit: false,
		},
		{
			name: "Loan Amount",
			selector: (row: Loan) =>
				moneyFormat(Number.parseInt(row?.totalLoanAmount)),
			omit: false,
			maxWidth: "130px",
		},
		{
			name: "Default Type",
			selector: (row: Loan) => row?.defaultType || "",
			omit: false,
			maxWidth: "130px",
		},
		{
			name: "LTV",
			selector: (row: Loan) =>
				(row?.ltv && row?.ltv && Number.parseInt(row?.ltv).toFixed(0)) || "",
			omit: false,
			maxWidth: "130px",
		},
		{
			name: "Phone #",
			selector: (row: Loan) => row?.borrower?.user.phoneNumber || "",
			omit: false,
			maxWidth: "130px",
		},
		{
			name: "Email",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.borrower?.user.email || "",
			omit: false,
		},
	];

	return (
		<div className="h-[30%] w-full flex gap-3 flex-wrap justify-between p-4">
			<div className="h-[70%] w-[49%] mb-10">
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
				<div
					onClick={() => {
						setOpenInsurance(true);
					}}
				>
					<DataTable
						columns={columns}
						data={reportLoan?.loans || []}
						progressPending={myData.isLoading}
					/>
				</div>
			</div>
			<div className="h-[70%] w-[49%]">
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
				<div
					onClick={() => {
						setOpenInsurance(true);
					}}
				>
					<DataTable
						columns={columns}
						data={reportLoan?.loans || []}
						progressPending={myData.isLoading}
					/>
				</div>
			</div>
			<div className="w-full flex flex-wrap mt-[120px] gap-10 justify-center">
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
						<div>
							{moneyFormat(Number.parseInt(reportLoan?.averageLoanAmount || 0))}
						</div>
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
			</div>

			<Modal
				visible={openInsurance}
				onHide={() => {
					setOpenInsurance(false);
				}}
				width="90vw"
				title="Loans"
			>
				<DataTable
					columns={columnsModal as any}
					data={modalColumnsData || []}
					progressPending={myData.isLoading}
				/>
			</Modal>
		</div>
	);
};
ManageInvestorReportsService;
