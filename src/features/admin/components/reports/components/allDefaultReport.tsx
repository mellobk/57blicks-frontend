/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, type FC, useEffect } from "react";

// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePieCanvas } from "@nivo/pie";
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

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const AllDefaultReport: FC = () => {
	const [openInsurance, setOpenInsurance] = useState(false);
	const [chartData, setChartData] = useState([]);
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
					id: `Insurance - ${getData.insurance.percentage}%`,
					label: `Insurance - ${getData.insurance.percentage}%`,
					value: getData.insurance.quantity,
					color: "hsl(110, 70%, 50%)",
				},
				{
					id: `Interest - ${getData.interest.percentage}%`,
					label: `Interest -${getData.interest.percentage}%`,
					value: getData.interest.quantity,
					color: "hsl(187, 70%, 50%)",
				},
				{
					id: `Tax - ${getData.tax.percentage}%`,
					label: `Tax - ${getData.tax.percentage}%`,
					value: getData.tax.quantity,
					color: "hsl(303, 70%, 50%)",
				},
			];
			setChartData(data as any);
		}
	}, [propertyInsuranceQuery.data]);

	const downloadReport = (): void => {
		const insuranceCsv = propertyInsuranceQuery.data?.defaultLoans;

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

		downloadCSV(data, "insurancesLoans.csv");
	};

	const downloadXlsxReport = (): void => {
		const insuranceCsv = propertyInsuranceQuery.data?.defaultLoans;

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

		downloadXLSX(data, "insurancesLoans.xlsx");
	};

	const columns = [
		{
			name: "Name",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.name || "",
			omit: false,
		},
		{
			name: "address",
			selector: (row: Loan): string => row.collaterals[0]?.address || "",
			omit: false,
		},
		{
			name: "Insurance Expiration Date",
			selector: (row: Loan) =>
				formatDate(
					row?.collaterals[0]?.insuranceExpirationDate.toString() || ""
				),
			omit: false,
		},
	];

	return (
		<div className="h-[50%] w-full">
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
					columns={columns}
					data={propertyInsuranceQuery.data?.defaultLoans.slice(0, 3) || []}
					progressPending={propertyInsuranceQuery.isLoading}
				/>
			</div>

			<Modal
				visible={openInsurance}
				onHide={() => {
					setOpenInsurance(false);
				}}
				title="Default Loans"
			>
				<DataTable
					columns={columns}
					data={propertyInsuranceQuery.data?.defaultLoans || []}
					progressPending={propertyInsuranceQuery.isLoading}
				/>
			</Modal>
		</div>
	);
};
