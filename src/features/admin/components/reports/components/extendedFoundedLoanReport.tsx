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
import { paidLoansTabs } from "../../servicing/utils/tabs";
import { Icon } from "@/components/ui/Icon";
import { LedgerList } from "../../notifications/components/Ledger";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const ExtendedLoanReport: FC = () => {
	const [actualTabData, setActualTabData] = useState<string>("30");
	const [openInsurance, setOpenInsurance] = useState(false);
	const [transaction, setTransaction] = useState(false);
	const [transactionId, setTransactionId] = useState();
	const [lastRowModal, setLastRowModal] = useState<Array<any>>([]);

	const propertyInsuranceQuery = useQuery(
		["all-extended-loans"],
		() => {
			return ManageReportsService.getExtendedFounded(actualTabData);
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
				"",
				moneyFormat(Number.parseInt(totalLoansAmount.toString())).replaceAll(
					",",
					"."
				),
				"",
				"",
			];
			setLastRowModal(lastRow);
		}
	}, [propertyInsuranceQuery.data]);

	const downloadReport = (): void => {
		const insuranceCsv = propertyInsuranceQuery.data?.defaultLoans;

		const headerCsv = [
			"Borrower Entity",
			"Property Address",
			"Lender",
			"Loan Amount",
			"Maturity Date",
			"Paid/Unpaid",
		];
		const csvData = insuranceCsv?.map((data) => {
			const lender = data?.fundingBreakDowns?.find(
				(data: { lender: { name: string } }) =>
					data?.lender?.name !== "DKC Servicing Fee Income"
			);

			return [
				data.borrower?.llc.replaceAll(",", " "),
				data?.borrower?.user.mailingAddress.replaceAll(",", " "),
				lender?.lender?.name || "",
				moneyFormat(Number.parseInt(data?.totalLoanAmount)).replaceAll(
					",",
					"."
				),
				formatDate(data?.maturityDate?.toString() || ""),
				data?.status === "PAID" ? "YES" : "NO",
			];
		});

		const data = [headerCsv, ...(csvData ?? []), lastRowModal];

		downloadCSV(data, "Extended Loans Funded.csv");
	};

	const downloadXlsxReport = (): void => {
		const insuranceCsv = propertyInsuranceQuery.data?.defaultLoans;

		const headerCsv = [
			"Borrower Entity",
			"Property Address",
			"Lender",
			"Loan Amount",
			"Maturity Date",
			"Paid/Unpaid",
		];
		const csvData = insuranceCsv?.map((data) => {
			const lender = data?.fundingBreakDowns?.find(
				(data: { lender: { name: string } }) =>
					data?.lender?.name !== "DKC Servicing Fee Income"
			);

			return [
				data.borrower?.llc,
				data?.borrower?.user.mailingAddress,
				moneyFormat(Number.parseInt(data?.totalLoanAmount)),
				lender?.lender?.name || "",
				data?.maturityDate,
				data?.status === "PAID" ? "YES" : "NO",
			];
		});

		const data = [headerCsv, ...(csvData ?? [])];

		void downloadXLSX(data, "Extended Loans Funded.xlsx");
	};

	useEffect(() => {
		void propertyInsuranceQuery.refetch();
	}, [actualTabData]);

	const columnsModal = [
		{
			name: "Borrower Entity",
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
			name: "Lender",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => {
				const lender = row?.fundingBreakDowns?.find(
					(data: { lender: { name: string } }) =>
						data?.lender?.name !== "DKC Servicing Fee Income"
				);
				return lender?.lender?.name || "";
			},

			omit: false,
		},
		{
			name: "Loan Amount",
			selector: (row: Loan) =>
				moneyFormat(Number.parseInt(row?.totalLoanAmount)),
			omit: false,
		},
		{
			name: "Maturity Date",
			selector: (row: Loan) => row?.maturityDate,
			omit: false,
		},

		{
			name: "Paid/Unpaid",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => (row?.status === "PAID" ? "YES" : "NO"),
			omit: false,
		},
		{
			name: "Transactions",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): JSX.Element => (
				<div
					onClick={() => {
						setTransaction(true);
						setTransactionId(row as any);
					}}
				>
					<Icon name="search" color="black" width="15" />
				</div>
			),
			omit: false,
		},
	];

	return (
		<div className=" w-full">
			<div className="flex items-center justify-between w-full px-5 bg-gray-200 p-3 g-3  h-[45px] ">
				<div
					className="font-bold text-[13px] w-full"
					onClick={() => {
						setOpenInsurance(true);
					}}
				>
					Extended Loans
				</div>
				<Tabs
					tabs={paidLoansTabs}
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
				className=" flex flex-col gap-1 "
				onClick={() => {
					setOpenInsurance(true);
				}}
			>
				<div className="font-bold text-[13px] p-5 bg-gray-200 flex  justify-between  h-[10px] items-center">
					<span>Extended Loans Total Average: </span>{" "}
					<span>
						{moneyFormat(propertyInsuranceQuery?.data?.averageLoanAmount || 0)}
					</span>
				</div>
				<div className="font-bold text-[13px]  p-5 flex  justify-between   h-[10px] items-center">
					<span># of Extended Loans</span>{" "}
					<span>
						{propertyInsuranceQuery?.data?.defaultLoans.length || "0"}
					</span>
				</div>
				<div className="font-bold text-[13px] p-5 bg-gray-200 flex  justify-between   h-[10px] items-center">
					<span>Average Interest Rate</span>{" "}
					<span>
						{propertyInsuranceQuery?.data?.averageInterestRate?.toFixed(4)}
					</span>
				</div>
				<div className="font-bold text-[13px] p-5  flex  justify-between  h-[10px] items-center">
					<span>Average LTV</span>{" "}
					<span>
						{propertyInsuranceQuery?.data?.averageLTV?.toFixed(0) || "0"}%
					</span>
				</div>
			</div>
			<div
				onClick={() => {
					setOpenInsurance(true);
				}}
			></div>

			<Modal
				visible={openInsurance}
				onHide={() => {
					setOpenInsurance(false);
				}}
				title="Extended Loans"
				width="90vw"
			>
				<DataTable
					columns={columnsModal as any}
					data={propertyInsuranceQuery.data?.defaultLoans || []}
					progressPending={propertyInsuranceQuery.isLoading}
				/>
			</Modal>

			<Modal
				visible={transaction}
				onHide={() => {
					setTransaction(false);
				}}
				title="Loan Transactions"
				width="90vw"
			>
				<LedgerList loan={transactionId as any} />
			</Modal>
		</div>
	);
};
