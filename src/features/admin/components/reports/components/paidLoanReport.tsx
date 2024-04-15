/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, type FC, useEffect } from "react";

// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
/* import { ResponsivePieCanvas } from "@nivo/pie"; */
import { formatDate, moneyFormat } from "@/utils/formats";
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
/* import { paidLoansTabs } from "../../servicing/utils/tabs"; */
import {
	getMonthsOfQuarter,
	getPreviousMonthQuarter,
	getPreviousThreeMonths,
	sortReportEndDate,
	statusReportTotalLoan,
} from "@/utils/common-functions";
import YearPicker from "@/components/ui/YearPicker";
import { Icon } from "@/components/ui/Icon";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const PaidLoanReport: FC = () => {
	const [actualYear, setActualYear] = useState(new Date().getFullYear());
	const reportsMonths = getPreviousThreeMonths(actualYear.toString());
	const [actualTabData, setActualTabData] = useState<string>(
		reportsMonths[2]?.label.toLowerCase() || ""
	);
	const [actualQuarter, setActualQuarter] = useState(getPreviousMonthQuarter());
	const findDate = reportsMonths.find(
		(data) => data?.label?.toLowerCase() === actualTabData
	);
	const [openInsurance, setOpenInsurance] = useState(false);
	const [lastRowModal, setLastRowModal] = useState<Array<any>>([]);
	const [modalColumnsData, setModalColumnsData] = useState<Array<any>>([]);
	const propertyInsuranceQuery = useQuery(
		["all-paid-loans"],
		() => {
			return ManageReportsService.getPaidOffLoans(
				findDate?.value || actualYear.toString()
			);
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	useEffect(() => {
		if (
			propertyInsuranceQuery.data &&
			propertyInsuranceQuery.data?.defaultLoans
		) {
			const insuranceCsv = propertyInsuranceQuery.data?.defaultLoans;

			const totalLoansAmount = insuranceCsv.reduce(
				(accumulator: number, dataInterest: { totalLoanAmount: string }) =>
					accumulator + Number.parseFloat(dataInterest.totalLoanAmount),
				0
			);

			const lastRow = [
				"",
				"",
				moneyFormat(Number.parseInt(totalLoansAmount.toString())).replaceAll(
					",",
					"."
				),
				"",
				"",
				"",
				"",
			];

			setModalColumnsData([
				...insuranceCsv,
				{
					ltv: "",
					originationDate: "",
					endDate: "",
					totalLoanAmount: totalLoansAmount.toString(),

					collaterals: [
						{
							address: "",
							taxUrl: "",
							insuranceExpirationDate: "2023-12-11",
						},
					],
					fundingBreakDowns: [
						{
							lender: {
								name: "",
								isSpecialCase: true,
							},
						},
						{
							lender: {
								name: "",
								isSpecialCase: false,
							},
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
	}, [propertyInsuranceQuery.data]);

	const downloadReport = (): void => {
		const insuranceCsv = propertyInsuranceQuery.data?.defaultLoans;

		const headerCsv = [
			"Borrower Entity",
			"Property Address",
			"Loan Amount",
			"Payoff Date",
			"Asset Type",
			"Loan Product",
			"Lender",
			"Rate",
		];
		const csvData = insuranceCsv?.map((data) => {
			const lender = data?.fundingBreakDowns?.find(
				(data: { lender: { name: string } }) =>
					data?.lender?.name !== "DKC Servicing Fee Income"
			);

			return [
				data.borrower?.llc.replaceAll(",", " "),
				data?.collaterals[0]?.address.replaceAll(",", " "),
				moneyFormat(Number.parseInt(data?.totalLoanAmount)).replaceAll(
					",",
					"."
				),
				formatDate(data?.endDate?.toString() || ""),
				data?.collaterals[0]?.assetType,
				data?.type,
				lender?.lender?.name,
				`${Number.parseFloat(data?.interestRate).toFixed(0)}%`,
			];
		});

		const data = [headerCsv, ...(csvData ?? []), lastRowModal];

		downloadCSV(data, "Loans Paid Off.csv");
	};

	const downloadXlsxReport = (): void => {
		const insuranceCsv = propertyInsuranceQuery.data?.defaultLoans;

		const headerCsv = [
			"Borrower Entity",
			"Property Address",
			"Loan Amount",
			"Payoff Date",
			"Asset Type",
			"Loan Product",
			"Lender",
			"Rate",
		];
		const csvData = insuranceCsv?.map((data) => {
			const lender = data?.fundingBreakDowns?.find(
				(data: { lender: { name: string } }) =>
					data?.lender?.name !== "DKC Servicing Fee Income"
			);

			return [
				data.borrower?.llc,
				data?.collaterals[0]?.address,
				moneyFormat(Number.parseInt(data?.totalLoanAmount)),
				formatDate(data?.endDate?.toString() || ""),
				data?.collaterals[0]?.assetType,
				data?.type,
				lender?.lender?.name,
				`${Number.parseFloat(data?.interestRate).toFixed(0)}%`,
			];
		});

		const data = [headerCsv, ...(csvData ?? []), lastRowModal];

		void downloadXLSX(data, "Loans Paid Off.xlsx");
	};

	useEffect(() => {
		void propertyInsuranceQuery.refetch();
	}, [actualTabData, actualYear]);

	const columnsModal = [
		{
			name: "Borrower Entity",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.borrower?.llc || "",
			omit: false,
			sortable: true,
		},
		{
			name: "Property Address",
			selector: (row: Loan): string => row.collaterals[0]?.address || "",
			omit: false,
			sortable: true,
		},
		{
			name: "Loan Amount",
			selector: (row: Loan) =>
				moneyFormat(Number.parseInt(row?.totalLoanAmount)),
			omit: false,
			sortFunction: statusReportTotalLoan,
		},
		{
			name: "Payoff Date",
			selector: (row: Loan) =>
				row?.endDate && formatDate(row?.endDate?.toString() || ""),
			omit: false,
			sortFunction: sortReportEndDate,
		},
		{
			name: "Asset Type",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.collaterals[0]?.assetType || "",
			omit: false,
			sortable: true,
		},
		{
			name: "Loan Product",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.type || "",
			omit: false,
			sortable: true,
		},
		{
			name: "Lender",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => {
				const lender = row?.fundingBreakDowns?.find(
					(data: { lender: { name: string } }) =>
						data.lender.name !== "DKC Servicing Fee Income"
				);
				return lender?.lender?.name || "";
			},

			omit: false,
			sortable: true,
		},
		{
			name: "Rate",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.interestRate || "",
			omit: false,
			sortable: true,
		},
	];

	return (
		<div className=" w-full">
			<div className="flex items-center justify-between w-full px-5 bg-gray-200 p-3 g-3  h-[45px]">
				<div
					className="font-bold text-[13px] w-full"
					onClick={() => {
						setOpenInsurance(true);
					}}
				>
					Loans Paid off
				</div>
				<div className="flex  justify-center items-center gap-2">
					<Tabs
						tabs={[{ label: "Ytd", value: "ytd" }]}
						actualTab={actualTabData}
						onClick={(value): void => {
							console.log(value);
							setActualTabData(value);
						}}
					/>
					{actualQuarter != 1 && (
						<div
							className="cursor-pointer"
							onClick={() => {
								setActualQuarter(actualQuarter - 1);
							}}
						>
							<Icon name="arrowLeft" width="15" color="black" />
						</div>
					)}
					<Tabs
						tabs={getMonthsOfQuarter(actualQuarter)}
						actualTab={actualTabData}
						onClick={(value): void => {
							setActualTabData(value);
						}}
					/>
					{actualQuarter != 4 && (
						<div
							className="cursor-pointer"
							onClick={() => {
								setActualQuarter(actualQuarter + 1);
							}}
						>
							<Icon name="arrowRight" width="8" color="black" />
						</div>
					)}

					<YearPicker
						arrowColors="black"
						backgroundColor="transparent"
						year={new Date().getFullYear()}
						onChange={(year: number) => {
							setActualYear(year);
						}}
						textColor="text-black"
					/>
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

			<div
				className=" flex flex-col gap-1 "
				onClick={() => {
					setOpenInsurance(true);
				}}
			>
				<div className="font-bold text-[13px] p-5 bg-gray-200 flex  justify-between  h-[10px] items-center">
					<span>Paid off Loans Total Average: </span>{" "}
					<span>
						{moneyFormat(propertyInsuranceQuery?.data?.averageLoanAmount || 0)}
					</span>
				</div>
				<div className="font-bold text-[13px]  p-5 flex  justify-between   h-[10px] items-center">
					<span># of Paid off Loans </span>{" "}
					<span>
						{propertyInsuranceQuery?.data?.defaultLoans.length || "0"}
					</span>
				</div>
			</div>

			<Modal
				visible={openInsurance}
				onHide={() => {
					setOpenInsurance(false);
				}}
				title="Paid Loans"
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
