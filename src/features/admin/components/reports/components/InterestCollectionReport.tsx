/* eslint-disable no-constant-binary-expression */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, type FC, useEffect } from "react";

// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { moneyFormat } from "@/utils/formats";
import { downloadCSV } from "@/utils/create-cvs";
import { downloadXLSX } from "@/utils/create-xlsx";
import type { Loan } from "../../servicing/types/api";
import ManageReportsService from "../api/reports";
import DataTable from "react-data-table-component";
import Csv from "@/assets/images/png/Csv.png";
import Xlsx from "@/assets/images/png/Xlsx.png";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "@/components/ui/Modal";
import { Tabs } from "../../servicing/component/Tabs";
import { newInterestTabs } from "../../servicing/utils/tabs";
import LoanInterestPieChart from "./PieCanvas/pieChart";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const InterestCollectionReport: FC = () => {
	const [openInsurance, setOpenInsurance] = useState(false);
	const [chartData, setChartData] = useState([]);
	const [lastRowModal, setLastRowModal] = useState<Array<any>>([]);
	const [modalColumnsData, setModalColumnsData] = useState<Array<any>>([]);
	const [actualTabData, setActualTabData] = useState<string>("month");
	const propertyInsuranceQuery = useQuery(
		["all-interest-loans"],
		() => {
			return ManageReportsService.getAllDefaultInterestLoan(actualTabData);
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	useEffect(() => {
		if (propertyInsuranceQuery.data) {
			const getData = propertyInsuranceQuery.data;
			/* 	const data = [
				{
					id: `Interest billed`,
					label: `interest billed `,
					value: Number.parseFloat(getData.totalCredit).toFixed(2),
					color: "hsl(110, 70%, 50%)",
				},
				{
					id: `Interest Collected `,
					label: `Interest Collected `,
					value: Number.parseFloat(getData.totalDebit).toFixed(2),
					color: "hsl(187, 70%, 50%)",
				},
			]; */

			const creditInterestTotal = getData.loans.reduce(
				(
					accumulator: number,
					loans: { totalInterestCredit: { toString: () => string } }
				) =>
					accumulator + Number.parseFloat(loans.totalInterestCredit.toString()),
				0
			);

			const debitInterestTotal = getData.loans.reduce(
				(
					accumulator: number,
					loans: { totalInterestDebit: { toString: () => string } }
				) =>
					accumulator + Number.parseFloat(loans.totalInterestDebit.toString()),
				0
			);

			const loans: Array<any> = [
				{
					id: "Outstanding Interest",
					totalLoanAmount: creditInterestTotal - debitInterestTotal,
				},
				// Add more loans as needed
			];
			setChartData(loans as any);
		}

		if (propertyInsuranceQuery.data?.loans) {
			const insuranceCsv = propertyInsuranceQuery.data?.loans;

			const totalLoansAmount = insuranceCsv.reduce(
				(accumulator: number, dataInterest: { totalLoanAmount: string }) =>
					accumulator + Number.parseFloat(dataInterest.totalLoanAmount),
				0
			);

			const totalLoansDue = insuranceCsv.reduce(
				(
					accumulator: number,
					dataInterest: {
						totalDebits: string;
						totalLoanAmount: string;
						totalInterest: string;
					}
				) => accumulator + Number.parseInt(dataInterest?.totalInterest),
				0
			);

			const lastRow = [
				"",
				"",
				moneyFormat(Number.parseInt(totalLoansAmount)).replaceAll(",", "."),
				"",
				"",
				moneyFormat(Number.parseInt(totalLoansDue)).replaceAll(",", "."),
			];

			setModalColumnsData([
				...insuranceCsv,
				{
					totalLoanAmount: totalLoansAmount.toString(),
					totalInterest: totalLoansDue,

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
					creditAverage: "201249.32",
					debitAverage: "250.00",
				},
			]);
			setLastRowModal(lastRow);
		}
	}, [propertyInsuranceQuery.data]);

	useEffect(() => {
		void propertyInsuranceQuery.refetch();
	}, [actualTabData]);

	const downloadReport = (): void => {
		const insuranceCsv = propertyInsuranceQuery.data?.loans;

		const headerCsv = [
			"Borrower Entity ",
			"Property Address",
			"Loan Amount",
			"Phone Number",
			"Email",
			"Due Interest",
		];
		const csvData = insuranceCsv?.map((data: any) => {
			return [
				data.borrower?.llc.replaceAll(",", " "),
				data?.borrower?.user.mailingAddress.replaceAll(",", " "),
				moneyFormat(Number.parseInt(data?.totalLoanAmount)).replaceAll(
					",",
					"."
				),
				data?.borrower?.user.phoneNumber,
				data?.borrower?.user.email,
				moneyFormat(Number.parseInt(data?.totalInterest)).replaceAll(",", "."),
			];
		});

		console.log(csvData);

		const data = [headerCsv, ...(csvData ?? []), lastRowModal];

		downloadCSV(data, "InterestCollectionReport.csv");
	};

	const downloadXlsxReport = (): void => {
		const insuranceCsv = propertyInsuranceQuery.data?.loans;

		const headerCsv = [
			"Borrower Entity ",
			"Property Address",
			"Loan Amount",
			"Phone Number",
			"Email",
			"Due Interest",
		];
		const csvData = insuranceCsv?.map((data: any) => {
			return [
				data.borrower?.llc,
				data?.borrower?.user.mailingAddress,
				moneyFormat(Number.parseInt(data?.totalLoanAmount)),
				data?.borrower?.user.phoneNumber,
				data?.borrower?.user.email,
				moneyFormat(Number.parseInt(data?.totalInterest)),
			];
		});

		const data = [headerCsv, ...(csvData ?? []), lastRowModal];

		void downloadXLSX(data, "InterestCollectionReport.xlsx");
	};

	const columns = [
		{
			name: "Name",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.borrower?.llc || "",
			omit: false,
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
		},
		{
			name: "Due Interest",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => {
				return moneyFormat(Number.parseInt(row?.totalInterest));
			},
			omit: false,
		},
	];

	const columnsModal = [
		{
			name: "Name",
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
			maxWidth: "200px",
			selector: (row: Loan) =>
				moneyFormat(Number.parseInt(row?.totalLoanAmount)),
			omit: false,
		},
		{
			name: "Phone Number",
			maxWidth: "200px",
			selector: (row: Loan) => row?.borrower?.user.phoneNumber,
			omit: false,
		},
		{
			name: "Email",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.borrower?.user.email || "",
			omit: false,
		},
		{
			name: "Due Interest",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => {
				return moneyFormat(Number.parseInt(row?.totalInterest));
			},
			omit: false,
		},
	];

	return (
		<div className="h-[60%] w-full">
			<div className="flex items-center justify-between w-full px-10 bg-gray-200 p-3 g-3 ">
				<div
					className="font-bold text-[13px] w-[300px]"
					onClick={() => {
						setOpenInsurance(true);
					}}
				>
					Interest Collection Report
				</div>
				<Tabs
					tabs={newInterestTabs}
					actualTab={actualTabData}
					onClick={(value): void => {
						setActualTabData(value);
					}}
				/>
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
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					padding: "35px 10px",
				}}
			>
				<div style={{ height: "300px" }}>
					{propertyInsuranceQuery.data?.loans && (
						<LoanInterestPieChart loans={chartData} />
					)}
				</div>
			</div>
			<div
				onClick={() => {
					setOpenInsurance(true);
				}}
			>
				<DataTable
					columns={columns as any}
					data={propertyInsuranceQuery.data?.loans.slice(0, 3) || []}
					progressPending={propertyInsuranceQuery.isLoading}
				/>
			</div>
			<Modal
				visible={openInsurance}
				onHide={() => {
					setOpenInsurance(false);
				}}
				title="Interest Collection Report"
				width="90vw"
			>
				<DataTable
					columns={columnsModal as any}
					data={modalColumnsData || []}
					progressPending={propertyInsuranceQuery.isLoading}
				/>
			</Modal>
		</div>
	);
};
