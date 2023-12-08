/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
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

const PropertyInsurance = () => {
	const [openInsurance, setOpenInsurance] = useState(false);
	const propertyInsuranceQuery = useQuery(
		["property-insurance"],
		() => {
			return ManageReportsService.getDefaultInsuranceLoan();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	const downloadReport = (): void => {
		const insuranceCsv = propertyInsuranceQuery.data?.defaultLoans;

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
		const csvData = insuranceCsv?.map((data) => {
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

		const data = [headerCsv, ...(csvData ?? [])];

		downloadCSV(data, "insurancesLoans.csv");
	};

	const downloadXlsxReport = (): void => {
		const insuranceCsv = propertyInsuranceQuery.data?.defaultLoans;

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
		const csvData = insuranceCsv?.map((data) => {
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

		const data = [headerCsv, ...(csvData ?? [])];

		downloadXLSX(data, "insurancesLoans.xlsx");
	};

	const columns = [
		{
			name: "Name",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row.name || "",
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

	const columnsModal = [
		{
			name: "Name",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string =>
				`${row?.borrower?.user.firstName} ${row?.borrower?.user.lastName}`,
			omit: false,
		},
		{
			name: "Phone",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.borrower?.user.phoneNumber || "",
			omit: false,
		},

		{
			name: "address",
			selector: (row: Loan): string => row.collaterals[0]?.address || "",
			omit: false,
		},
		{
			name: "Email",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: Loan): string => row?.borrower?.user.email || "",
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
		<>
			<div className="cursor-pointer w-full">
				<div className="flex items-center justify-between w-full px-10 bg-gray-200 p-3 g-3 ">
					<div
						className="font-bold text-[13px]"
						onClick={() => {
							setOpenInsurance(true);
						}}
					>
						Default Loans - Property Insurance
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

				<div
					className="flex w-full h-[80px] justify-center items-center font-bold  text-[28px]"
					onClick={() => {
						setOpenInsurance(true);
					}}
				>
					{propertyInsuranceQuery.data?.loansQuantity}%
				</div>
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
			</div>
			<Modal
				visible={openInsurance}
				onHide={() => {
					setOpenInsurance(false);
				}}
				title="Default Loans - Property Insurance"
			>
				<DataTable
					columns={columnsModal}
					data={propertyInsuranceQuery.data?.defaultLoans || []}
					progressPending={propertyInsuranceQuery.isLoading}
				/>
			</Modal>
		</>
	);
};

export default PropertyInsurance as any;
