/* eslint-disable no-use-before-define */
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
import ManageReportsService from "../api/reports";
import Csv from "@/assets/images/png/Csv.png";
import Xlsx from "@/assets/images/png/Xlsx.png";
import { useQuery } from "@tanstack/react-query";
import { ResponsivePieCanvas } from "@nivo/pie";
import type { Loan } from "@/types/api/loan";
import { Modal } from "@/components/ui/Modal";
import DataTable from "react-data-table-component";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const LoanProductReport: FC = () => {
	const [openInsurance, setOpenInsurance] = useState(false);

	const headerCsv = [
		"Borrower LLC",
		"Property Address",
		"Loan Amount",
		"Asset Type",
	];
	const [chartData, setChartData] = useState([]);
	const [keys, setKey] = useState<Array<string>>([]);
	const [excelData, setExcelData] = useState<Array<any>>([]);
	const consultantQuery = useQuery(
		["all-products-loans"],
		() => {
			return ManageReportsService.getLoanProduct();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	const columnsModal = [
		{
			name: "Borrower LLC",
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

	useEffect(() => {
		if (consultantQuery.data) {
			const getData = consultantQuery?.data.data as unknown as Array<any>;

			const keys = Object.keys(getData);
			/* 	const valuesArray = keys.map((key) => getData[key]); */

			setKey(keys);

			const data = keys.map((value) => {
				return {
					id: `${value} `,
					label: `${value} `,
					value: getData[value as any]?.length || [],
					color: "hsl(110, 70%, 50%)",
				};
			});

			/* 			const data = [
				{
					id: `Paid - ${getData.paid.percentage}%`,
					label: `Paid - ${getData.paid.percentage}%`,
					value: getData.paid.quantity,
					color: "hsl(110, 70%, 50%)",
				},
				{
					id: `Unpaid - ${getData.unPaid.percentage}%`,
					label: `Unpaid -${getData.unPaid.percentage}%`,
					value: getData.unPaid.quantity,
					color: "hsl(187, 70%, 50%)",
				},
			]; */
			setChartData(data as any);
		}
	}, [consultantQuery.data]);

	useEffect(() => {
		if (consultantQuery.data) {
			const insuranceCsv = consultantQuery.data.data;

			const csvData = keys?.map((data) => {
				const productData = insuranceCsv[data]?.map((value: Loan) => {
					return [
						value.borrower?.llc,
						value?.borrower?.user.mailingAddress,
						moneyFormat(Number.parseInt(value?.totalLoanAmount)),
						formatDate(value?.originationDate.toString()),
						value?.collaterals[0]?.assetType,
					];
				});
				return [[data], ...productData];
			});

			const arrayExcel: Array<Array<any>> = [];
			csvData.map((data) => {
				return arrayExcel.push(...data);
			});
			setExcelData(arrayExcel);
		}
	}, [consultantQuery.data]);

	const downloadReport = (): void => {
		const insuranceCsv = consultantQuery.data.loans;

		const csvData = insuranceCsv?.map((data: any) => {
			return [
				data.borrower?.llc,
				data?.borrower?.user.mailingAddress,
				moneyFormat(Number.parseInt(data?.totalLoanAmount)),
				formatDate(data?.originationDate.toString()),
				data?.collaterals[0]?.assetType,
			];
		});

		const data = [headerCsv, ...csvData];
		downloadCSV(data, "LoansByProduct.csv");
	};

	const downloadXlsxReport = (): void => {
		const insuranceCsv = consultantQuery.data.loans;

		const csvData = insuranceCsv?.map((data: any) => {
			return [
				data.borrower?.llc,
				data?.borrower?.user.mailingAddress,
				moneyFormat(Number.parseInt(data?.totalLoanAmount)),
				formatDate(data?.originationDate.toString()),
				data?.collaterals[0]?.assetType,
			];
		});
		const data = [headerCsv, ...csvData];
		downloadXLSX(data, "LoansByProduct.xlsx");
	};

	return (
		<div className="h-[60%] w-full">
			<div className="flex items-center justify-between w-full px-10 bg-gray-200 p-3 g-3 ">
				<div className="font-bold text-[13px]">Loans by Product</div>
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
				className="p-4 flex flex-col gap-1"
				onClick={() => {
					setOpenInsurance(true);
				}}
			>
				<div className="font-bold text-[15px] p-5 bg-gray-200 flex  justify-between">
					<span># of Loans</span>{" "}
					<span>{consultantQuery?.data?.loansNumber}</span>
				</div>
				<div className="font-bold text-[13px]  p-5 flex  justify-between">
					<span>Average Interest Rate</span>{" "}
					<span>
						{consultantQuery?.data?.averageInterest?.toFixed(4) || "0"}
					</span>
				</div>
				<div className="font-bold text-[13px] p-5 bg-gray-200 flex  justify-between">
					<span>Average LTV</span>{" "}
					<span>{consultantQuery?.data?.averageLtv?.toFixed(4) || "0"}</span>
				</div>
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
					data={consultantQuery.data?.loans || []}
					progressPending={consultantQuery.isLoading}
				/>
			</Modal>
		</div>
	);
};
