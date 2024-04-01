/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ManageReportsService from "../api/reports";
import Csv from "@/assets/images/png/Csv.png";
import Xlsx from "@/assets/images/png/Xlsx.png";
import { Modal } from "@/components/ui/Modal";
import type { Loan } from "../../servicing/types/api";
import { formatDate, moneyFormat } from "@/utils/formats";

import DataTable from "react-data-table-component";
import { downloadCSV } from "@/utils/create-cvs";
import { downloadXLSX } from "@/utils/create-xlsx";
import { Tabs } from "../../servicing/component/Tabs";
import { insuranceTabs } from "../../servicing/utils/tabs";
import { ResponsivePieCanvas } from "@nivo/pie";

const PropertyInsurance = () => {
	const [openInsurance, setOpenInsurance] = useState(false);
	const [actualTabData, setActualTabData] = useState<string>("expired");
	const [lastRowModal, setLastRowModal] = useState<Array<any>>([]);
	const [modalColumnsData, setModalColumnsData] = useState<Array<any>>([]);
	const propertyInsuranceQuery = useQuery(
		["property-insurance"],
		() => {
			return ManageReportsService.getDefaultInsuranceLoan(actualTabData);
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	useEffect(() => {
		void propertyInsuranceQuery.refetch();
	}, [actualTabData]);

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
					totalLoanAmount: totalLoansAmount.toString(),

					collaterals: [
						{
							address: "",
							taxUrl: "",
							insuranceExpirationDate: "",
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
			"Lender",
			"Expiration Date",
			"LTV",
			"Phone #",
			"Email",
		];
		const csvData = insuranceCsv?.map((data) => {
			return [
				data.borrower?.llc.replaceAll(",", " "),
				data?.borrower?.user.mailingAddress.replaceAll(",", " "),
				moneyFormat(Number.parseInt(data?.totalLoanAmount)).replaceAll(
					",",
					"."
				),
				data?.fundingBreakDowns[1]?.lender.name,
				formatDate(
					data?.collaterals[0]?.insuranceExpirationDate.toString() || ""
				),
				data?.ltv,
				data?.borrower?.user.phoneNumber,
				data?.borrower?.user.email,
			];
		});

		const data = [headerCsv, ...(csvData ?? []), lastRowModal];

		downloadCSV(data, "Insurances Loans.csv");
	};

	const downloadXlsxReport = (): void => {
		const insuranceCsv = propertyInsuranceQuery.data?.defaultLoans;

		const headerCsv = [
			"Borrower Entity",
			"Property Address",
			"Loan Amount",
			"Lender",
			"Expiration Date",
			"LTV",
			"Phone #",
			"Email",
		];
		const csvData = insuranceCsv?.map((data) => {
			return [
				data.borrower?.llc.replaceAll(",", " "),
				data?.borrower?.user.mailingAddress.replaceAll(",", " "),
				moneyFormat(Number.parseInt(data?.totalLoanAmount)).replaceAll(
					",",
					"."
				),
				data?.fundingBreakDowns[1]?.lender.name,
				formatDate(
					data?.collaterals[0]?.insuranceExpirationDate.toString() || ""
				),
				data?.ltv,
				data?.borrower?.user.phoneNumber,
				data?.borrower?.user.email,
			];
		});

		const data = [headerCsv, ...(csvData ?? [])];

		void downloadXLSX(data, "Insurances Loans.xlsx");
	};

	const columns = [
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
			maxWidth: "300px",
			omit: false,
		},
		{
			name: "Loan Amount",
			selector: (row: Loan) =>
				moneyFormat(Number.parseInt(row?.totalLoanAmount)),
			omit: false,
		},
		{
			name: "Lender",
			maxWidth: "200px",
			selector: (row: Loan) => row?.fundingBreakDowns[1]?.lender.name || "",
			omit: false,
		},
		{
			name: "Expiration Date",
			maxWidth: "200px",
			selector: (row: Loan) =>
				row?.collaterals[0]?.insuranceExpirationDate &&
				formatDate(
					row?.collaterals[0]?.insuranceExpirationDate.toString() || ""
				),
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
			maxWidth: "300px",
			omit: false,
		},
		{
			name: "Loan Amount",
			maxWidth: "150px",
			selector: (row: Loan) =>
				moneyFormat(Number.parseInt(row?.totalLoanAmount)),
			omit: false,
		},
		{
			name: "Lender",
			maxWidth: "200px",
			selector: (row: Loan) => row?.fundingBreakDowns[1]?.lender.name || "",
			omit: false,
		},
		{
			name: "Expiration Date",
			maxWidth: "200px",
			selector: (row: Loan) =>
				row?.collaterals[0]?.insuranceExpirationDate &&
				formatDate(
					row?.collaterals[0]?.insuranceExpirationDate.toString() || ""
				),
			omit: false,
		},
		{
			name: "LTV",
			maxWidth: "50px",
			selector: (row: Loan) =>
				row?.ltv && `${Number.parseFloat(row?.ltv).toFixed(0) || "0"}%`,
			omit: false,
		},
		{
			name: "Phone #",
			maxWidth: "140px",
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

	return (
		<>
			<div className="cursor-pointer w-full">
				<div className="flex items-center justify-between w-full px-10 bg-gray-200 p-3 g-3 ">
					<div
						className="font-bold text-[13px] w-[200px]"
						onClick={() => {
							setOpenInsurance(true);
						}}
					>
						Property Insurance
					</div>

					<Tabs
						tabs={insuranceTabs}
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
					className="flex w-full h-[365px] justify-center items-center font-bold  text-[28px]"
					onClick={() => {
						setOpenInsurance(true);
					}}
				>
					<ResponsivePieCanvas
						data={[
							{
								id: `insurance - ${propertyInsuranceQuery.data?.loansQuantity.toFixed(
									2
								)}%`,
								label: `insurance - ${propertyInsuranceQuery.data?.loansQuantity.toFixed(
									2
								)}%`,
								value: propertyInsuranceQuery.data?.defaultLoans.length,
								color: "hsl(110, 70%, 50%)",
							},
						]}
						margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
						innerRadius={0.5}
						padAngle={0.7}
						cornerRadius={3}
						activeOuterRadiusOffset={8}
						colors={{ scheme: "paired" }}
						borderColor={{
							from: "color",
							modifiers: [["opacity", 0.6]],
						}}
						arcLinkLabelsSkipAngle={10}
						arcLinkLabelsTextColor="#333333"
						arcLinkLabelsThickness={2}
						arcLinkLabelsColor={{ from: "color" }}
						arcLabelsSkipAngle={10}
						arcLabelsTextColor="white"
						legends={[
							{
								anchor: "right",
								direction: "column",
								justify: false,
								translateX: 140,
								translateY: 0,
								itemsSpacing: 2,
								itemWidth: 60,
								itemHeight: 14,
								itemTextColor: "#999",
								itemDirection: "left-to-right",
								itemOpacity: 1,
								symbolSize: 14,
								symbolShape: "circle",
							},
						]}
					/>
				</div>
				<div
					onClick={() => {
						setOpenInsurance(true);
					}}
				>
					<DataTable
						columns={columns as any}
						data={propertyInsuranceQuery.data?.defaultLoans.slice(0, 3) || []}
						progressPending={propertyInsuranceQuery.isLoading}
					/>
				</div>
			</div>
			<Modal
				visible={openInsurance}
				onHide={() => {
					setOpenInsurance(false);
				}}
				width="90vw"
				title="Property Insurance"
			>
				<DataTable
					columns={columnsModal as any}
					data={modalColumnsData}
					progressPending={propertyInsuranceQuery.isLoading}
				/>
			</Modal>
		</>
	);
};

export default PropertyInsurance as any;
