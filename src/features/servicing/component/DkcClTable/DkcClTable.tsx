import { useState } from "react";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import type { DkcServicing } from "../../types/api";
import { servicingTabs } from "../../utils/tabs";
import { ServicingTable } from "../ServicingTable";

interface SuccessProps {}

export const DkcClTable: React.FC<SuccessProps> = () => {
	const [searchValue, setSearchValue] = useState<string>("");

	const handleSearch = (data: string) => {
		setSearchValue(data);
		return data;
	};

	console.log(searchValue);
	/* 	const adminMutation = useMutation(() => {
		return ManageUsersService.filterAllAdmins(searchValue);
	}); */

	const conditionalRowStyles = [
		{
			when: (row: DkcServicing) => !row?.originDate,
			style: {
				opacity: 0.4,
			},
		},
	];

	const columns = [
		{
			name: "Borrower",
			maxWidth: "230px",
			minWidth: "230px",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: DkcServicing): string => row?.borrower || "",
			omit: false,
		},
		{
			name: "Collateral Address",
			selector: (row: DkcServicing): string => `${row?.collateralAddress}`,
			sortable: true,
			omit: false,
			maxWidth: "500px",
			minWidth: "500px",
		},
		{
			name: "Total Loan",
			selector: (row: DkcServicing): string => row?.totalLoan || "",
			sortable: true,
			omit: false,
			maxWidth: "150px",
			minWidth: "150px",
		},
		{
			name: "Rate",
			selector: (row: DkcServicing): string => row?.rate || "",
			omit: false,
			maxWidth: "100px",
			minWidth: "100px",
		},
		{
			name: "Monthly Payment",
			selector: (row: DkcServicing): string => row?.monthlyPayment || "",
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
		},
		{
			name: "Origin Date",
			selector: (row: DkcServicing): string => row?.originDate || "",
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
		},
		{
			name: "Maturity Date",
			selector: (row: DkcServicing): string => row?.maturityDate || "",
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
		},
		{
			name: "Maturity Date",
			selector: (row: DkcServicing): string => row?.maturityDate || "",
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
		},
	];

	const data = [
		{
			borrower: "Skematic Design Company LLC",
			collateralAddress:
				"4613 Driesler Cir, Tampa, FL 33634 & 4222 Empire PL, Tampa, FL 33610",
			totalLoan: "$280,000.00",
			rate: "12%",
			monthlyPayment: "$2,800.00",
			originDate: "00-00-0000",
			maturityDate: "07-01-2024",
		},
	];

	return (
		<>
			<ServicingTable
				handleSearchValue={handleSearch}
				columns={columns}
				data={data}
				widthSearch="60px"
				conditionalRowStyles={conditionalRowStyles}
			>
				<>
					<div className="relative w-[115px]">
						<div className="absolute w-[200px]" style={{ top: "-8px" }}>
							<BreadCrumb initialTab="Servicing" actualTab="DKC Lending CL" />
						</div>
					</div>

					<div className="relative z-10">
						<Tabs tabs={servicingTabs} actualTab="dkc lending cl" />
					</div>
				</>
			</ServicingTable>
		</>
	);
};
