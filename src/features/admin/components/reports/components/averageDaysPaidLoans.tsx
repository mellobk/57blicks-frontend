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

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const AverageDaysPaidLoans: FC = () => {
	const [chartData, setChartData] = useState([]);
	const [chartAssetData, setAssetChartData] = useState([]);
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
			const keys = Object.keys(keyAssetValues);
			/* 	const valuesArray = keys.map((key) => getData[key]); */

			console.log(keyAssetValues, keys, getData);

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
			const keys = Object.keys(keyAssetValues);
			/* 	const valuesArray = keys.map((key) => getData[key]); */

			console.log(keyAssetValues, keys, getData);

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
			setAssetChartData(data as any);
		}
	}, [consultantQuery.data]);

	const downloadReport = (): void => {
		/* 		const insuranceCsv = consultantQuery.data?.defaultLoans;

		const headerCsv = [
			"Borrower",
			"Collateral Address",
			"Total Loan",
			"Origin Date",
			"Maturity Date",
			"Insurance Expiration Date",
		];
		const csvData = insuranceCsv?.map((data) => {
			return [
				`${data.borrower?.user.firstName} ${data.borrower?.user.lastName}`,
				data?.collaterals[0]?.address,
				moneyFormat(Number.parseInt(data?.totalLoanAmount)),
				formatDate(data?.originationDate.toString()),
				formatDate(data?.maturityDate.toString()),
				formatDate(
					data.collaterals[0]?.insuranceExpirationDate.toString() || ""
				),
			];
		});

		const data = [headerCsv, ...(csvData ?? [])];

		downloadCSV(data, "paidLoans.csv"); */
	};

	const downloadXlsxReport = (): void => {
		/* 	const insuranceCsv = consultantQuery.data?.defaultLoans;

		const headerCsv = [
			"Borrower",
			"Collateral Address",
			"Total Loan",
			"Origin Date",
			"Maturity Date",
			"Insurance Expiration Date",
		];
		const csvData = insuranceCsv?.map((data) => {
			return [
				`${data.borrower?.user.firstName} ${data.borrower?.user.lastName}`,
				data?.collaterals[0]?.address,
				moneyFormat(Number.parseInt(data?.totalLoanAmount)),
				formatDate(data?.originationDate.toString()),
				formatDate(data?.maturityDate.toString()),
				formatDate(
					data.collaterals[0]?.insuranceExpirationDate.toString() || ""
				),
			];
		});

		const data = [headerCsv, ...(csvData ?? [])];

		downloadXLSX(data, "paidLoans.xlsx"); */
	};

	return (
		<div className="flex w-full justify-center gap-3">
			<div className="w-[30%] h-[82%] flex">
				<ReportTable title="Average Roll Rate for all Loans">
					<div>{consultantQuery.data?.averagePaidLoans || 0}</div>
				</ReportTable>
			</div>
			<div className="h-[82%] w-[30%]">
				<div className="flex items-center justify-between w-full px-10 bg-gray-200 p-3 g-3 ">
					<div className="font-bold text-[13px]">
						Average Roll Rate by Loan Product
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
				<PieCanvas data={chartData} />
			</div>
			<div className="h-[82%] w-[30%]">
				<div className="flex items-center justify-between w-full px-10 bg-gray-200 p-3 g-3 ">
					<div className="font-bold text-[13px]">
						Average Roll Rate by Asset Type
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
				<PieCanvas data={chartAssetData} />
			</div>
		</div>
	);
};
