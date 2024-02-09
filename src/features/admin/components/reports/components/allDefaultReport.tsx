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
import { ResponsivePieCanvas } from "@nivo/pie";
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

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const AllDefaultReport: FC = () => {
	const [openInsurance, setOpenInsurance] = useState(false);
	const [chartData, setChartData] = useState([]);
	const [lastRowModal, setLastRowModal] = useState<Array<any>>([]);
	const [modalColumnsData, setModalColumnsData] = useState<Array<any>>([]);
	const propertyInsuranceQuery = useQuery(
		["all-default-loans"],
		() => {
			return ManageReportsService.getAllDefaultLoan();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	useEffect(() => {
		if (propertyInsuranceQuery.data) {
			const getData = propertyInsuranceQuery.data;
			const data = [
				{
					id: `Insurance - ${Number.parseFloat(
						getData.insurance.percentage.toString()
					).toFixed(2)}%`,
					label: `Insurance - ${Number.parseFloat(
						getData.insurance.percentage.toString()
					).toFixed(2)}%`,
					value: getData.insurance.quantity,
					color: "hsl(110, 70%, 50%)",
				},
				{
					id: `Interest - ${Number.parseFloat(
						getData.interest.percentage.toString()
					).toFixed(2)}%`,
					label: `Interest - ${Number.parseFloat(
						getData.interest.percentage.toString()
					).toFixed(2)}%`,
					value: getData.interest.quantity,
					color: "hsl(187, 70%, 50%)",
				},
				{
					id: `Tax - ${Number.parseFloat(
						getData.tax.percentage.toString()
					).toFixed(2)}%`,
					label: `Tax - ${Number.parseFloat(
						getData.tax.percentage.toString()
					).toFixed(2)}%`,
					value: getData.tax.quantity,
					color: "hsl(303, 70%, 50%)",
				},

				{
					id: `Unauthorized - ${Number.parseFloat(
						getData.unauthorized.percentage.toString()
					).toFixed(2)}%`,
					label: `Unauthorized - ${Number.parseFloat(
						getData.unauthorized.percentage.toString()
					).toFixed(2)}%`,
					value: getData.unauthorized.quantity,
					color: "hsl(303, 70%, 50%)",
				},
			];

			if (propertyInsuranceQuery.data?.defaultLoans) {
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
			setChartData(data as any);
		}
	}, [propertyInsuranceQuery.data]);

	const downloadReport = (): void => {
		const insuranceCsv = propertyInsuranceQuery.data?.defaultLoans;

		const headerCsv = [
			"Borrower Entity",
			"Property Address",
			"Loan Amount",
			"Lender",
			"Default Type",
			"LTV",
			"Phone #",
			"Email",
		];
		const csvData = insuranceCsv?.map((data) => {
			return [
				data.borrower?.llc,
				data?.borrower?.user.mailingAddress,
				moneyFormat(Number.parseInt(data?.totalLoanAmount)).replaceAll(
					",",
					"."
				),
				data?.fundingBreakDowns[1]?.lender.name,
				data?.defaultType,
				data?.ltv,
				data?.borrower?.user.phoneNumber,
				data?.borrower?.user.email,
			];
		});

		const data = [headerCsv, ...(csvData ?? []), lastRowModal];

		downloadCSV(data, "allDefaultLoans.csv");
	};

	const downloadXlsxReport = (): void => {
		const insuranceCsv = propertyInsuranceQuery.data?.defaultLoans;

		const headerCsv = [
			"Borrower Entity",
			"Property Address",
			"Loan Amount",
			"Lender",
			"Default Type",
			"LTV",
			"Phone #",
			"Email",
		];
		const csvData = insuranceCsv?.map((data) => {
			return [
				data.borrower?.llc,
				data?.borrower?.user.mailingAddress,
				moneyFormat(Number.parseInt(data?.totalLoanAmount)),
				data?.fundingBreakDowns[1]?.lender?.name,
				data?.defaultType,
				data?.ltv,
				data?.borrower?.user.phoneNumber,
				data?.borrower?.user.email,
			];
		});

		const data = [headerCsv, ...(csvData ?? []), lastRowModal];

		downloadXLSX(data, "allDefaultLoans.xlsx");
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
			name: "Default Type",
			selector: (row: Loan) => row?.defaultType || "",
			maxWidth: "120px",
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
		<div className="h-[60%] w-full">
			<div className="flex items-center justify-between w-full px-10 bg-gray-200 p-3 g-3 ">
				<div
					className="font-bold text-[13px]"
					onClick={() => {
						setOpenInsurance(true);
					}}
				>
					Default Loans
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
			<ResponsivePieCanvas
				data={chartData}
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

			<Modal
				visible={openInsurance}
				onHide={() => {
					setOpenInsurance(false);
				}}
				width="90vw"
				title="Default Loans"
			>
				<DataTable
					columns={columnsModal}
					data={modalColumnsData || []}
					progressPending={propertyInsuranceQuery.isLoading}
				/>
			</Modal>
		</div>
	);
};
