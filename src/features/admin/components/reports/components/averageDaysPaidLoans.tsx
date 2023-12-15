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
import ManageReportsService from "../api/reports";
import { useQuery } from "@tanstack/react-query";
import Csv from "@/assets/images/png/Csv.png";
import Xlsx from "@/assets/images/png/Xlsx.png";
import ReportTable from "./ReportComponent/ReportComponent";
import { PieCanvas } from "./PieCanvas/PieCanvas";
import { formatDate, moneyFormat } from "@/utils/formats";
import type { Loan } from "@/types/api/loan";
import { downloadXLSX } from "@/utils/create-xlsx";
import { downloadCSV } from "@/utils/create-cvs";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const AverageDaysPaidLoans: FC = () => {
	const headerCsv = [
		"Borrower",
		"Address",
		"phone",
		"email",
		"Collateral Address",
		"Total Loan",
		"Origin Date",
		"Maturity Date",
		"Insurance Expiration Date",
	];

	const [chartData, setChartData] = useState([]);
	const [chartAssetData, setAssetChartData] = useState([]);
	const [assetKeys, setAssetKey] = useState<Array<string>>([]);
	const [productKeys, setProductKeys] = useState<Array<string>>([]);
	const [excelDataLoanAsset, setExcelDataLoanAsset] = useState<Array<any>>([]);
	const [excelDataLoans, setExcelDataLoans] = useState<Array<any>>([]);
	const [excelDataLoanProduct, setExcelDataLoanProduct] = useState<Array<any>>(
		[]
	);

	const consultantQuery = useQuery(
		["average-paid-days-loans"],
		() => {
			return ManageReportsService.getLoanPaidAverageDays();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	useEffect(() => {
		if (consultantQuery.data) {
			const getData = consultantQuery?.data
				.loanProductDaysAverage as unknown as Array<any>;

			const keyAssetValues = getData.map((value) => Object.keys(value)[0]);
			setProductKeys(keyAssetValues as any);
			const object: Record<string, any> = {};

			getData.forEach((value) => {
				if (
					typeof value === "object" &&
					value &&
					Object.keys(value).length > 0
				) {
					const key = Object.keys(value)[0];
					if (key) {
						object[key] = value[key];
					}
				}
			});

			const data = keyAssetValues.map((value) => {
				return {
					id: `${value} `,
					label: `${value} `,
					value: object[value as string],
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
			const getData = consultantQuery?.data
				.loansPaidByAsset as unknown as Array<any>;

			const keyAssetValues = getData.map((value) => Object.keys(value)[0]);
			setAssetKey(keyAssetValues as any);
			const object: Record<string, any> = {};

			getData.forEach((value) => {
				if (
					typeof value === "object" &&
					value &&
					Object.keys(value).length > 0
				) {
					const key = Object.keys(value)[0];
					if (key) {
						object[key] = value[key];
					}
				}
			});

			const data = keyAssetValues.map((value) => {
				return {
					id: `${value} `,
					label: `${value} `,
					value: object[value as string],
					color: "hsl(110, 70%, 50%)",
				};
			});

			console.log(data);
			setAssetChartData(data as any);
		}
	}, [consultantQuery.data]);

	useEffect(() => {
		if (consultantQuery.data) {
			const insuranceCsv = consultantQuery.data.dataByAsset;

			const csvData = assetKeys?.map((data) => {
				const productData = insuranceCsv[data]?.map((value: Loan) => {
					return [
						`${value.borrower?.user.firstName} ${value.borrower?.user.lastName}`,
						value?.borrower?.user.mailingAddress,
						value?.borrower?.user.phoneNumber,
						value?.borrower?.user.email,
						value?.collaterals[0]?.address,
						moneyFormat(Number.parseInt(value?.totalLoanAmount)),
						formatDate(value?.originationDate.toString()),
						formatDate(value?.maturityDate.toString()),
						formatDate(
							value.collaterals[0]?.insuranceExpirationDate.toString() || ""
						),
					];
				});
				return [[data], ...(productData || [])];
			});

			const arrayExcel: Array<Array<any>> = [];
			csvData.map((data) => {
				return arrayExcel.push(...data);
			});

			setExcelDataLoanAsset(arrayExcel);
		}
	}, [assetKeys]);

	useEffect(() => {
		if (consultantQuery.data) {
			const insuranceCsv = consultantQuery.data.dataByProduct;

			const csvData = productKeys?.map((data) => {
				const productData = insuranceCsv[data]?.map((value: Loan) => {
					return [
						`${value.borrower?.user.firstName} ${value.borrower?.user.lastName}`,
						value?.borrower?.user.mailingAddress,
						value?.borrower?.user.phoneNumber,
						value?.borrower?.user.email,
						value?.collaterals[0]?.address,
						moneyFormat(Number.parseInt(value?.totalLoanAmount)),
						formatDate(value?.originationDate.toString()),
						formatDate(value?.maturityDate.toString()),
						formatDate(
							value.collaterals[0]?.insuranceExpirationDate.toString() || ""
						),
					];
				});
				return [[data], ...(productData || [])];
			});

			const arrayExcel: Array<Array<any>> = [];
			csvData.map((data) => {
				return arrayExcel.push(...data);
			});

			setExcelDataLoanProduct(arrayExcel);
		}
	}, [productKeys]);

	useEffect(() => {
		if (consultantQuery.data) {
			const insuranceCsv = consultantQuery.data.dataByAsset;

			const csvData = assetKeys?.map((data) => {
				console.log(assetKeys, insuranceCsv);
				const productData = insuranceCsv[data]?.map((value: Loan) => {
					return [
						value.borrower?.llc,
						value?.borrower?.user.mailingAddress,
						moneyFormat(Number.parseInt(value?.totalLoanAmount)),
						formatDate(value?.originationDate.toString()),
						value?.collaterals[0]?.assetType,
					];
				});
				return [[data], ...(productData || [])];
			});

			const arrayExcel: Array<Array<any>> = [];
			csvData.map((data) => {
				return arrayExcel.push(...data);
			});

			setExcelDataLoanAsset(arrayExcel);
		}
	}, [productKeys]);

	useEffect(() => {
		if (consultantQuery.data) {
			const insuranceCsv = consultantQuery.data.data || [];

			const csvData = insuranceCsv?.map((data: any) => {
				return [
					`${data.borrower?.user.firstName} ${data.borrower?.user.lastName}`,
					data?.borrower?.user.mailingAddress,
					data?.borrower?.user.phoneNumber,
					data?.borrower?.user.email,
					data?.collaterals[0]?.address,
					moneyFormat(Number.parseInt(data?.totalLoanAmount)),
					formatDate(data?.originationDate.toString()),
					formatDate(data?.maturityDate.toString()),
					formatDate(
						data.collaterals[0]?.insuranceExpirationDate.toString() || ""
					),
				];
			});

			setExcelDataLoans(csvData);
		}
	}, [consultantQuery.data]);

	const downloadLoanAssetReport = (): void => {
		const data = [headerCsv, ...(excelDataLoanAsset ?? [])];

		downloadCSV(data, "AverageRollRateByAsset.csv");
	};

	const downloadXlsxLoanAssetReport = (): void => {
		const data = [headerCsv, ...(excelDataLoanAsset ?? [])];

		downloadXLSX(data, "AverageRollRateByAsset.xlsx");
	};

	const downloadLoanProductReport = (): void => {
		const data = [headerCsv, ...(excelDataLoanProduct ?? [])];

		downloadCSV(data, "AverageRollRateByProduct.csv");
	};

	const downloadXlsxLoanProductReport = (): void => {
		const data = [headerCsv, ...(excelDataLoanProduct ?? [])];

		downloadXLSX(data, "AverageRollRateByProduct.xlsx");
	};

	const downloadLoansReport = (): void => {
		const data = [headerCsv, ...(excelDataLoans ?? [])];

		downloadCSV(data, "AverageRollRateForAllLoans.csv");
	};

	const downloadXlsxLoansReport = (): void => {
		const data = [headerCsv, ...(excelDataLoans ?? [])];

		downloadXLSX(data, "AverageRollRateForAllLoans.xlsx");
	};

	return (
		<div className="flex w-full justify-center gap-3">
			<div className="w-[30%] h-[82%] flex">
				<ReportTable
					title="Average Roll Rate for all Loans"
					downloadReport={downloadLoansReport}
					downloadXlsxReport={downloadXlsxLoansReport}
				>
					<div>{consultantQuery.data?.averagePaidLoans || 0}</div>
				</ReportTable>
			</div>
			<div className="h-[82%] w-[30%]">
				<div className="flex items-center justify-between w-full px-10 bg-gray-200 p-3 g-3 ">
					<div className="font-bold text-[13px]">
						Average Roll Rate by Loan Product
					</div>
					<div className="flex gap-2 ml-2" onClick={downloadLoanProductReport}>
						<div className="w-[35px] h-[35px] bg-white flex items-center justify-center rounded-xl">
							<img src={Csv} alt="DKC Csv" />
						</div>

						<div
							className="w-[35px] h-[35px] bg-green-1100 flex items-center justify-center rounded-xl"
							onClick={downloadXlsxLoanProductReport}
						>
							<img src={Xlsx} alt="DKC Xlsx" />
						</div>
					</div>
				</div>
				<PieCanvas data={chartData} />
			</div>
			<div className="h-[82%] w-[30%]">
				<div className="flex items-center justify-between w-full px-10 bg-gray-200 p-3 g-3 ">
					<div className="font-bold text-[13px]">
						Average Roll Rate by Asset Type
					</div>
					<div className="flex gap-2 ml-2" onClick={downloadLoanAssetReport}>
						<div className="w-[35px] h-[35px] bg-white flex items-center justify-center rounded-xl">
							<img src={Csv} alt="DKC Csv" />
						</div>

						<div
							className="w-[35px] h-[35px] bg-green-1100 flex items-center justify-center rounded-xl"
							onClick={downloadXlsxLoanAssetReport}
						>
							<img src={Xlsx} alt="DKC Xlsx" />
						</div>
					</div>
				</div>
				<PieCanvas data={chartAssetData} />
			</div>
		</div>
	);
};
