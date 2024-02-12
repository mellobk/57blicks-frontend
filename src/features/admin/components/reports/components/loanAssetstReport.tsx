/* eslint-disable @typescript-eslint/no-unused-vars */
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

export const AssetLoanReport: FC = () => {
	const [openInsurance, setOpenInsurance] = useState(false);

	const headerCsv = [
		"Borrower Entity",
		"Property Address",
		"Loan Amount",
		"Payoff Date",
		"Asset Type",
		"Loan Product",
		"Rate",
	];

	const [chartData, setChartData] = useState([]);
	const [keys, setKey] = useState<Array<string>>([]);
	const [_, setExcelData] = useState<Array<any>>([]);
	const [lastRowModal, setLastRowModal] = useState<Array<any>>([]);
	const [modalColumnsData, setModalColumnsData] = useState<Array<any>>([]);
	const getLoanAssets = useQuery(
		["all-assets-loans"],
		() => {
			return ManageReportsService.getLoanAssets();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	useEffect(() => {
		if (getLoanAssets.data && getLoanAssets.data?.loans) {
			const insuranceCsv = getLoanAssets.data?.loans;

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
	}, [getLoanAssets.data]);

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
			name: "Loan Amount",
			selector: (row: Loan) =>
				moneyFormat(Number.parseInt(row?.totalLoanAmount)),
			omit: false,
		},
		{
			name: "Origination Date",
			selector: (row: Loan) =>
				row?.originationDate &&
				formatDate(row?.originationDate?.toString() || ""),
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
			name: "Rate",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string =>
				`${Number.parseFloat(row?.interestRate).toFixed(0)}%`,
			omit: false,
		},
	];

	useEffect(() => {
		if (getLoanAssets.data) {
			const getData = getLoanAssets?.data.data as unknown as Array<any>;

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

			console.log(data);

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
	}, [getLoanAssets.data]);

	useEffect(() => {
		if (getLoanAssets.data) {
			const insuranceCsv = getLoanAssets.data.data;

			const csvData = keys?.map((data) => {
				const productData = insuranceCsv[data]?.map((value: Loan) => {
					return [
						value.borrower?.llc,
						value?.collaterals[0]?.address,
						moneyFormat(Number.parseInt(value?.totalLoanAmount)),
						formatDate(value?.originationDate?.toString() || ""),
						value?.collaterals[0]?.assetType,
						value?.type,
						`${Number.parseFloat(value?.interestRate).toFixed(0)}%`,
					];
				});
				return [[data], ...productData, lastRowModal];
			});

			const arrayExcel: Array<Array<any>> = [];
			csvData.map((data) => {
				return arrayExcel.push(...data);
			});

			setExcelData(arrayExcel);
		}
	}, [getLoanAssets.data]);

	const downloadReport = (): void => {
		const insuranceCsv = getLoanAssets.data.loans;

		const csvData = insuranceCsv?.map((data: any) => {
			return [
				data.borrower?.llc.replaceAll(",", " "),
				data?.collaterals[0]?.address.replaceAll(",", " "),
				moneyFormat(Number.parseInt(data?.totalLoanAmount)).replaceAll(
					",",
					"."
				),
				formatDate(data?.originationDate?.toString() || ""),
				data?.collaterals[0]?.assetType,
				data?.type,
				`${Number.parseFloat(data?.interestRate).toFixed(0)}%`,
			];
		});
		const data = [headerCsv, ...csvData, lastRowModal];
		downloadCSV(data, "Loans By Asset.csv");
	};

	const downloadXlsxReport = (): void => {
		const insuranceCsv = getLoanAssets.data.loans;

		const csvData = insuranceCsv?.map((data: any) => {
			return [
				data.borrower?.llc,
				data?.collaterals[0]?.address,
				moneyFormat(Number.parseInt(data?.totalLoanAmount)),
				formatDate(data?.originationDate?.toString() || ""),
				data?.collaterals[0]?.assetType,
				data?.type,
				`${Number.parseFloat(data?.interestRate).toFixed(0)}%`,
			];
		});
		const data = [headerCsv, ...csvData, lastRowModal];

		void downloadXLSX(data, "Loans By Asset.xlsx");
	};

	return (
		<div className="h-[60%] w-full">
			<div className="flex items-center justify-between w-full px-10 bg-gray-200 p-3 g-3 ">
				<div className="font-bold text-[13px]">Loans by Asset Type</div>
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
				className=" flex flex-col gap-1"
				onClick={() => {
					setOpenInsurance(true);
				}}
			>
				<div className="font-bold text-[13px] p-5 bg-gray-200 flex  justify-between  h-[10px] items-center">
					<span># of Loans</span>{" "}
					<span>{getLoanAssets?.data?.loansNumber}</span>
				</div>
				<div className="font-bold text-[13px]  p-5 flex  justify-between  h-[10px] items-center">
					<span>Average Interest Rate</span>{" "}
					<span>{getLoanAssets?.data?.averageInterest?.toFixed(4) || "0"}</span>
				</div>
				<div className="font-bold text-[13px] p-5 bg-gray-200 flex  justify-between  h-[10px] items-center">
					<span>Average LTV</span>{" "}
					<span>{getLoanAssets?.data?.averageLtv?.toFixed(0) || "0"}%</span>
				</div>
			</div>

			<Modal
				visible={openInsurance}
				onHide={() => {
					setOpenInsurance(false);
				}}
				title="Loans"
				width="90vw"
			>
				<DataTable
					columns={columnsModal as any}
					data={modalColumnsData || []}
					progressPending={getLoanAssets.isLoading}
				/>
			</Modal>
		</div>
	);
};
