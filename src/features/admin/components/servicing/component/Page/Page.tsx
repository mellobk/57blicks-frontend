/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type FC, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import type { DkcLenders, FundingBreakdown } from "../../types/api";
import { servicingTabs } from "../../utils/tabs";
import { Table } from "./Table/Table";
import { Toggle } from "@/components/ui/Toggle";
import { ShowModal } from "@/features/admin/components/servicing/component/Page/ShowModal/ShowModal";
import { formatDate, moneyFormat } from "@/utils/formats";
import {
	getIsSameMonthYear,
	statusDefault,
	statusDefaultType,
	statusTaxes,
	validateDate,
} from "@/utils/common-functions";
import LendersService from "@/api/lenders.ts";
import type { Lender } from "@/types/api/lender";
import LoansService from "@/api/loans";
import { LoanStatusType } from "@/types/api/notifications";
import moment from "moment";
import type { ParticipationBreakdown } from "@/types/api/participation-breakdown";

interface Props {
	actualTab: string;
	id?: string;
}

export const Page: FC<Props> = ({ actualTab, id }) => {
	const idQueryParameter = new URLSearchParams(window.location.search);
	const idParameter = idQueryParameter.get("id");
	const tabParameter = idQueryParameter.get("tab");
	const [modalData, setModalData] = useState<FundingBreakdown | null>(null);
	const [searchValue, setSearchValue] = useState<string>("");
	const [archived, setArchived] = useState<boolean>(false);
	const [lenders, setLenders] = useState<Array<Lender>>([]);
	const [tableData, setTableData] = useState<Array<DkcLenders>>([]);
	const currentMonthName = moment().format("MMMM");

	const findDkcLender = () => {
		const findLender = lenders?.find(
			(data) =>
				data.name.toLocaleLowerCase() === (actualTab || id)?.toLowerCase()
		);

		console.log(findLender);

		return findLender?.id || "";
	};

	const updateLoanQuery = useMutation(
		async (body: { id: string; taxesPaid?: boolean; status?: string }) => {
			const dataTaxes = {
				taxesPaid: body.taxesPaid || false,
			};

			const dataStatus = {
				status: body.status || "",
			};
			return LoansService.updateLoan(
				body.id || "",
				body.status ? dataStatus : dataTaxes
			);
		}
	);

	/* 	const getLenderQuery = useQuery(
		["lender-query-id"],
		() => {
			return LendersService.getLenderById(findDkcLender(), searchValue);
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	); */

	const getDkcLenderQuery = useMutation(async () => {
		return LendersService.getLenderById(findDkcLender(), searchValue, archived);
	});

	const dkcLendersQuery = useQuery(
		["dkc-lenders-query"],
		() => {
			return LendersService.getLenders();
		},
		{ enabled: true }
	);

	const handleRefreshData = (): void => {
		getDkcLenderQuery.mutate();
	};

	const handleTax = (id: string, data: boolean): void => {
		updateLoanQuery.mutate({
			id: id,
			taxesPaid: data,
		});
	};

	const handleDefault = (id: string, data: string): void => {
		updateLoanQuery.mutate({
			id: id,
			status: data,
		});
	};

	/* 	useEffect(() => {
		if (getLenderQuery.data) {
			setTableData(getLenderQuery?.data?.fundingBreakdowns);
			getLenderQuery.remove();
		}
	}, [updateLoanQuery]); */

	useEffect(() => {
		if (tableData && idParameter) {
			/* 			const userParameters = tableData.find((data) => data.id === idParameter);
			setSelectedUser(userParameters || {}); */

			const userParameters = tableData.find(
				(data) => data?.loan?.id === idParameter
			);
			setModalData(userParameters as any);
		}
	}, [tableData, idParameter]);

	useEffect(() => {
		if (updateLoanQuery.isSuccess) {
			getDkcLenderQuery.mutate();
			updateLoanQuery.reset();
		}
	}, [updateLoanQuery]);

	useEffect(() => {
		getDkcLenderQuery.mutate();
	}, [searchValue, lenders, archived]);

	useEffect(() => {
		if (getDkcLenderQuery.isSuccess) {
			setTableData(getDkcLenderQuery?.data?.fundingBreakdowns || []);
			getDkcLenderQuery.reset();
		}
	}, [getDkcLenderQuery]);

	useEffect(() => {
		if (dkcLendersQuery?.data) {
			setLenders(dkcLendersQuery?.data || []);
		}
	}, [dkcLendersQuery.isFetching]);

	const conditionalRowStyles = [
		{
			when: (row: FundingBreakdown) => row?.loan.status === LoanStatusType.PAID,
			style: {
				opacity: 0.4,
			},
		},
		{
			when: (row: FundingBreakdown) =>
				row?.loan.status === LoanStatusType.DEFAULT,
			style: {
				backgroundColor: "#f7ece0",
				color: "#de6903",
				border: "#de6903",
				borderTopStyle: "solid",
				borderBottomStyle: "solid",
				borderWidth: "thin",
			},
		},
	];

	const columns = [
		{
			name: "Borrower",
			maxWidth: "230px",
			minWidth: "230px",
			selector: (row: FundingBreakdown) =>
				row?.loan.borrower?.llc ||
				`${row?.loan.borrower?.user.firstName} ${row?.loan.borrower?.user.lastName}`,
			omit: false,
			sortable: true,
		},
		{
			name: "Collateral Address",
			selector: (row: FundingBreakdown) =>
				row?.loan?.collaterals[0]?.address || "",
			sortable: true,
			omit: false,
			maxWidth: "500px",
			minWidth: "500px",
		},
		{
			name: "Total Loan",
			selector: (row: FundingBreakdown) =>
				moneyFormat(Number.parseInt(row?.loan?.totalLoanAmount)),
			sortable: true,
			omit: false,
			maxWidth: "150px",
			minWidth: "150px",
		},
		{
			name: "Rate",
			selector: (row: FundingBreakdown) => row?.loan.interestRate,
			omit: false,
			sortable: true,
			maxWidth: "100px",
			minWidth: "100px",
		},
		{
			name: "Regular Payment",
			selector: (row: FundingBreakdown) =>
				moneyFormat(Number.parseInt(row?.loan?.regular || "0")),
			omit: false,
			sortable: true,
			maxWidth: "150px",
			minWidth: "150px",
		},
		{
			name: "Origin Date",
			selector: (row: FundingBreakdown) =>
				formatDate(row?.loan?.originationDate.toString()),
			omit: false,
			sortable: true,
			maxWidth: "130px",
			minWidth: "130px",
		},
		{
			name: "Maturity Date",
			selector: (row: FundingBreakdown) =>
				formatDate(row?.loan?.maturityDate.toString()),
			omit: false,
			sortable: true,
			maxWidth: "130px",
			minWidth: "130px",
			conditionalCellStyles: [
				{
					when: (row: FundingBreakdown) =>
						validateDate(row?.loan?.maturityDate.toString() || ""),
					style: {
						background: "#fbf4f7",
						color: "#fe3d64",
					},
				},
			],
		},
		{
			name: "Insurance Expiration Date",
			selector: (row: FundingBreakdown) =>
				formatDate(
					row?.loan.collaterals[0]?.insuranceExpirationDate.toString() || ""
				),
			omit: false,
			sortable: true,
			maxWidth: "130px",
			minWidth: "130px",
			conditionalCellStyles: [
				{
					when: (row: FundingBreakdown) =>
						validateDate(
							row?.loan.collaterals[0]?.insuranceExpirationDate.toString() || ""
						),
					style: {
						background: "#fbf4f7",
						color: "#fe3d64",
					},
				},
			],
		},
		{
			name: "Taxed Paid",
			maxWidth: "50px",
			sortable: true,
			sortFunction: statusTaxes,
			selector: (row: FundingBreakdown) => (
				<div key={row.id}>
					<Toggle
						checked={row.loan.taxesPaid}
						onChecked={(data): void => {
							handleTax(row.loan.id || "", data.target.checked);
						}}
						checkedClassName="bg-green-500"
						label="Paid"
						labelClassName="text-black text-[13px]"
					/>
				</div>
			),
			omit: false,
		},

		{
			name: "In Default",
			maxWidth: "50px",
			sortable: true,
			sortFunction: statusDefault,
			selector: (row: FundingBreakdown) => (
				<div key={row.id} className="flex justify-center items-center w-full">
					<Toggle
						checked={row.loan.status === LoanStatusType.DEFAULT}
						onChecked={(): void => {
							if (row.loan.status === LoanStatusType.DEFAULT)
								handleDefault(row.loan.id || "", LoanStatusType.APPROVED);
						}}
						checkedClassName="bg-orange-500"
						label=""
						labelClassName="text-black text-[13px]"
					/>
				</div>
			),
			omit: false,
		},

		{
			name: "Default Type",
			maxWidth: "",
			sortFunction: statusDefaultType,
			sortable: true,
			selector: (row: FundingBreakdown) => (
				<div key={row.loan.id}>{row.loan.defaultType}</div>
			),
			omit: false,
		},
		{
			name: `${currentMonthName} (Current)`,
			sortable: true,
			selector: (row: ParticipationBreakdown) => {
				const data = getIsSameMonthYear(
					row.loan.originationDate as unknown as string
				)
					? row.loan.prorated
					: row.loan.regular;
				console.log(data);
				return moneyFormat(Number.parseFloat(data || "0"));
			},

			conditionalCellStyles: [
				{
					when: (row: ParticipationBreakdown) => !!row,
					style: {
						background: "#C79E631F",
						color: "#C79E63",
					},
				},
			],
		},
	];

	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full rounded-3xl">
			<Table
				setArchived={(): void => {
					setArchived(!archived);
				}}
				archivedValue={archived}
				handleSearchValue={setSearchValue}
				columns={columns}
				data={tableData}
				widthSearch="60px"
				onRowClicked={setModalData}
				conditionalRowStyles={conditionalRowStyles}
			>
				<>
					<div className="relative w-[115px]">
						<div className="absolute w-[200px]" style={{ top: "-8px" }}>
							<BreadCrumb initialTab="Servicing" actualTab={actualTab} />
						</div>
					</div>

					<div className="relative z-10">
						<Tabs tabs={servicingTabs} actualTab={actualTab.toLowerCase()} />
					</div>
				</>
			</Table>
			<ShowModal
				data={modalData || undefined}
				openModal={!!modalData}
				handleRefreshData={handleRefreshData}
				handleOnCLose={(): void => {
					setModalData(null);
				}}
				tab={tabParameter || ""}
			/>
		</div>
	);
};
