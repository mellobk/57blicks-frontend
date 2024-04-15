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

import { Tabs } from "../../servicing/component/Tabs";
import { Select } from "@/components/forms/Select";
import {
	getMonthsOfQuarter,
	getPreviousMonthQuarter,
	getPreviousThreeMonths,
	sortReportOriginateDate,
	statusReportTotalLoan,
} from "@/utils/common-functions";
import YearPicker from "@/components/ui/YearPicker";
import { Icon } from "@/components/ui/Icon";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const ConsultantLoanReport: FC = () => {
	const [actualYear, setActualYear] = useState(new Date().getFullYear());
	const reportsMonths = getPreviousThreeMonths(actualYear.toString());
	const [actualTabData, setActualTabData] = useState<string>("ytd");
	const [openInsurance, setOpenInsurance] = useState(false);
	const [actualQuarter, setActualQuarter] = useState(getPreviousMonthQuarter());
	const [chartData, setChartData] = useState([]);
	const [keys, setKey] = useState<Array<string>>([]);
	const [accountData, setAccountData] = useState<string>("all");
	const [_, setExcelData] = useState<Array<any>>([]);
	const [lastRowModal, setLastRowModal] = useState<Array<any>>([]);
	const [modalColumnsData, setModalColumnsData] = useState<Array<any>>([]);
	const [userData, setUserData] = useState<Array<any>>([]);
	const [optionsConsultants, setOptionsConsultants] = useState<Array<any>>([]);

	const findDate = reportsMonths.find(
		(data) => data?.label?.toLowerCase() === actualTabData
	);

	const consultantQuery = useQuery(
		["all-consultant-loans"],
		() => {
			return ManageReportsService.getLoanConsultant(
				findDate?.value || actualYear.toString()
			);
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	useEffect(() => {
		void consultantQuery.refetch();
	}, [actualTabData, actualYear]);

	useEffect(() => {
		if (consultantQuery.data && consultantQuery.data?.loans) {
			const insuranceCsv = userData;

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
	}, [consultantQuery.data, userData]);

	useEffect(() => {
		if (accountData === "all") {
			setUserData(consultantQuery?.data?.loans || []);
		} else {
			console.log(accountData);
			const filterQuery = consultantQuery.data.loans.filter(
				(data: { loanConsultant: string }) =>
					data.loanConsultant === accountData
			);
			setUserData(filterQuery);
		}
	}, [accountData]);

	useEffect(() => {
		if (consultantQuery.data) {
			const insuranceCsv = consultantQuery.data.data;

			const csvData = keys?.map((data) => {
				const productData =
					insuranceCsv[data]?.map((value: Loan) => {
						return [
							value.borrower?.llc,
							value?.collaterals[0]?.address,
							moneyFormat(Number.parseInt(value?.totalLoanAmount)),
							formatDate(value?.originationDate?.toString() || ""),
							value?.collaterals[0]?.assetType,
							value?.type,
							`${Number.parseFloat(value?.interestRate).toFixed(0)}%`,
						];
					}) || [];
				return [[data], ...productData];
			});

			const arrayExcel: Array<Array<any>> = [];
			csvData.map((data) => {
				return arrayExcel.push(...data);
			});

			const options = consultantQuery.data.loans.map(
				(data: { loanConsultant: any }) => {
					return {
						code: data?.loanConsultant || "",
						name: data?.loanConsultant || "",
					};
				}
			);

			const unique = options.filter(
				(item: { code_: any; name: any }, index: any, self: Array<any>) =>
					index ===
					self.findIndex((t) => t.code_ === item.code_ && t.name === item.name)
			);

			unique.sort((a: { name: string }, b: { name: any }) =>
				a.name.localeCompare(b.name)
			);

			setOptionsConsultants([{ code: "all", name: "all" }, ...unique]);

			setExcelData(arrayExcel);
			setUserData(consultantQuery.data.loans);
		}
	}, [consultantQuery.data]);

	const headerCsv = [
		"Borrower Entity",
		"Property Address",
		"Loan Amount",
		"Origination Date",
		"Loan Consultant",
		"Rate",
		"LTV",
	];

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
			selector: (row: Loan) => (
				<div className=" w-[290px] break-words whitespace-normal p-2">
					{row?.collaterals[0]?.address || ""}
				</div>
			),
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
			name: "Origination Date",
			selector: (row: Loan) =>
				row?.originationDate &&
				formatDate(row?.originationDate?.toString() || ""),
			omit: false,
			sortFunction: sortReportOriginateDate,
		},
		{
			name: "Loan Consultant",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.loanConsultant || "",
			omit: false,
			sortable: true,
		},
		{
			name: "Rate",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string =>
				row?.interestRate &&
				`${Number.parseFloat(row?.interestRate).toFixed(0)}%`,
			omit: false,
			sortable: true,
		},
		{
			name: "LTV",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string =>
				row?.ltv &&
				`  ${Number.parseFloat(row?.ltv.toString() || "").toFixed(0)}%`,
			omit: false,
			sortable: true,
		},
	];

	useEffect(() => {
		if (consultantQuery.data) {
			const getData =
				accountData === "all"
					? consultantQuery?.data.data
					: {
							[accountData]: consultantQuery?.data.data[accountData],
					  };
			const keys = Object.keys(getData);
			setKey(keys);

			const data = keys.map((value: string) => {
				return {
					id: `${value}`,
					label: `${value}`,
					value: getData[value]?.length || [],
					color: "hsl(110, 70%, 50%)",
				};
			});

			setChartData(data as any);
		}
	}, [consultantQuery.data, accountData]);

	const downloadReport = (): void => {
		const insuranceCsv = userData;

		const csvData = insuranceCsv?.map((data: any) => {
			return [
				data.borrower?.llc.replaceAll(",", " "),
				data?.collaterals[0]?.address.replaceAll(",", " "),
				moneyFormat(Number.parseInt(data?.totalLoanAmount)).replaceAll(
					",",
					"."
				),
				formatDate(data?.originationDate?.toString() || ""),
				data?.loanConsultant,
				`${Number.parseFloat(data?.interestRate).toFixed(0)}%`,
				`${Number.parseFloat(data?.ltv.toString() || "").toFixed(0)}%`,
			];
		});
		const data = [headerCsv, ...csvData, lastRowModal];

		downloadCSV(data, "Loans By Consultant.csv");
	};

	const downloadXlsxReport = (): void => {
		const insuranceCsv = userData;

		const csvData = insuranceCsv?.map((data: any) => {
			return [
				data.borrower?.llc.replaceAll(",", " "),
				data?.collaterals[0]?.address,
				moneyFormat(Number.parseInt(data?.totalLoanAmount)),
				formatDate(data?.originationDate?.toString() || ""),
				data?.loanConsultant,
				`${Number.parseFloat(data?.interestRate).toFixed(0)}%`,
				`${Number.parseFloat(data?.ltv.toString() || "").toFixed(0)}%`,
			];
		});
		const data = [headerCsv, ...csvData, lastRowModal];

		void downloadXLSX(data, "Loans By Consultant.xlsx");
	};

	return (
		<div className="h-[60%] w-full">
			<div className="flex items-center justify-between w-full px-10 bg-gray-200 p-3 g-3 ">
				<div className="font-bold text-[13px]">Loans by Consultant</div>
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
			<div className="w-[20%] ml-2 mt-2">
				<Select
					className="flex flex-col gap-2"
					label=""
					placeholder="Select Loan Consultant"
					value={accountData}
					options={optionsConsultants}
					onChange={(event): void => {
						setAccountData(event.target.value as string);
					}}
				/>
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
					<span>{consultantQuery?.data?.loansNumber}</span>
				</div>
				<div className="font-bold text-[13px]  p-5 flex  justify-between  h-[10px] items-center">
					<span>Average Interest Rate</span>{" "}
					<span>
						{consultantQuery?.data?.averageInterest?.toFixed(4) || "0"}
					</span>
				</div>
				<div className="font-bold text-[13px] p-5 bg-gray-200 flex justify-between  h-[10px] items-center">
					<span>Average LTV</span>{" "}
					<span>{consultantQuery?.data?.averageLtv?.toFixed(0) || "0"}%</span>
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
					progressPending={consultantQuery.isLoading}
				/>
			</Modal>
		</div>
	);
};
