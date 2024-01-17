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
import { newFoundedTabs } from "../../servicing/utils/tabs";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const NewFoundedLoanReport: FC = () => {
	const [actualTabData, setActualTabData] = useState<string>("30");
	const [openInsurance, setOpenInsurance] = useState(false);

	const propertyInsuranceQuery = useQuery(
		["all-new-loans-founded"],
		() => {
			return ManageReportsService.getNewLoansFounded(actualTabData);
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	const downloadReport = (): void => {
		const insuranceCsv = propertyInsuranceQuery.data?.defaultLoans;

		const headerCsv = [
			"Borrower Entity",
			"Property Address",
			"Loan Amount",
			"Asset Type",
		];
		const csvData = insuranceCsv?.map((data) => {
			return [
				data.borrower?.llc,
				data?.borrower?.user.mailingAddress,
				moneyFormat(Number.parseInt(data?.totalLoanAmount)),
				formatDate(data?.originationDate.toString()),
				data?.collaterals[0]?.assetType,
			];
		});

		const data = [headerCsv, ...(csvData ?? [])];

		downloadCSV(data, "newLoansFounded.csv");
	};

	const downloadXlsxReport = (): void => {
		const insuranceCsv = propertyInsuranceQuery.data?.defaultLoans;

		const headerCsv = [
			"Borrower Entity",
			"Property Address",
			"Loan Amount",
			"Asset Type",
		];
		const csvData = insuranceCsv?.map((data) => {
			return [
				data.borrower?.llc,
				data?.borrower?.user.mailingAddress,
				moneyFormat(Number.parseInt(data?.totalLoanAmount)),
				data?.collaterals[0]?.assetType,
			];
		});

		const data = [headerCsv, ...(csvData ?? [])];

		downloadXLSX(data, "newLoansFounded.xlsx");
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
		{
			name: "Loan Product",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.type || "",
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
			name: "Rate",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.interestRate || "",
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
					New Loans Funded
				</div>
				<Tabs
					tabs={newFoundedTabs}
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
					<span>New Loans Total Average: </span>{" "}
					<span>
						{moneyFormat(propertyInsuranceQuery?.data?.loanAverage || 0)}
					</span>
				</div>
				<div className="font-bold text-[13px]  p-5 flex  justify-between   h-[10px] items-center">
					<span># of New Loans</span>{" "}
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
				title="New Loans Funded"
				width="90vw"
			>
				<DataTable
					columns={columnsModal as any}
					data={propertyInsuranceQuery.data?.defaultLoans || []}
					progressPending={propertyInsuranceQuery.isLoading}
				/>
			</Modal>
		</div>
	);
};
