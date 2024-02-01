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
import { Tabs } from "../../servicing/component/Tabs";
import { newInterestTabs } from "../../servicing/utils/tabs";

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
			const data = [
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
			];
			setChartData(data as any);
		}

		if (propertyInsuranceQuery.data?.loans) {
			const insuranceCsv = propertyInsuranceQuery.data?.loans;

			const totalLoansAmount = insuranceCsv.reduce(
				(accumulator: number, dataInterest: { totalLoanAmount: string }) =>
					accumulator + Number.parseFloat(dataInterest.totalLoanAmount),
				0
			);

			const lastRow = [
				"",
				"",
				moneyFormat(Number.parseInt(totalLoansAmount)),
				"",
				"",
				"",
			];
			setModalColumnsData([
				...insuranceCsv,
				{
					totalLoanAmount: totalLoansAmount.toString(),

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
			"Due Amount",
		];
		const csvData = insuranceCsv?.map((data: any) => {
			return [
				data.borrower?.llc,
				data?.borrower?.user.mailingAddress,
				moneyFormat(Number.parseInt(data?.totalLoanAmount)),
				data?.borrower?.user.phoneNumber,
				data?.borrower?.user.email,
				moneyFormat(Number.parseInt(data?.totalDebits)),
			];
		});

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
			"Due Amount",
		];
		const csvData = insuranceCsv?.map((data: any) => {
			return [
				data.borrower?.llc,
				data?.borrower?.user.mailingAddress,
				moneyFormat(Number.parseInt(data?.totalLoanAmount)),
				data?.borrower?.user.phoneNumber,
				data?.borrower?.user.email,
				moneyFormat(Number.parseInt(data?.totalDebits)),
			];
		});

		const data = [headerCsv, ...(csvData ?? []), lastRowModal];

		downloadXLSX(data, "InterestCollectionReport.xlsx");
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
			selector: (row: Loan): string => row?.collaterals[0]?.address || "",
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
			name: "Name",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.borrower?.llc || "",
			omit: false,
			maxWidth: "250px",
		},
		{
			name: "Property Address",
			selector: (row: Loan): string => row?.collaterals[0]?.address || "",
			omit: false,
		},
		{
			name: "Loan Amount",
			maxWidth: "130px",
			selector: (row: Loan) =>
				moneyFormat(Number.parseInt(row?.totalLoanAmount)),
			omit: false,
		},
		{
			name: "Phone Number",
			maxWidth: "130px",
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
			name: "Due Amount",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string =>
				moneyFormat(Number.parseInt(row?.totalDebits)) || "",
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
					columns={columns}
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
