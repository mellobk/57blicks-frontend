import { useState } from "react";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import type { DkcServicing } from "../../types/api";
import { servicingTabs } from "../../utils/tabs";
import { ServicingTable } from "../ServicingTable";
import { Toggle } from "@/components/ui/Toggle";
import { ServicingModal } from "../ServicingModal/ServicingModal";

interface SuccessProps {}

export const DkcLlcTable: React.FC<SuccessProps> = () => {
	const [searchValue, setSearchValue] = useState<string>("");
	console.log(searchValue);

	const handleSearch = (data: string) => {
		setSearchValue(data);
		return data;
	};

	const validateDate = (date: string): boolean => {
		console.log(date);
		const dateObject = new Date(date);
		const now = new Date();

		dateObject.setHours(0, 0, 0, 0);
		now.setHours(0, 0, 0, 0);

		const dateInMillie = dateObject.getTime();
		const nowInMillie = now.getTime();

		if (dateInMillie < nowInMillie) {
			return true;
		}
		return false;
	};

	const columns = [
		{
			name: "Borrower",
			maxWidth: "230px",
			minWidth: "230px",
			selector: (row: DkcServicing): JSX.Element => <div>{row?.borrower}</div>,
			omit: false,
		},
		{
			name: "Collateral Address",
			selector: (row: DkcServicing): JSX.Element => (
				<div>{row?.collateralAddress}</div>
			),
			sortable: true,
			omit: false,
			maxWidth: "500px",
			minWidth: "500px",
		},
		{
			name: "Total Loan",
			selector: (row: DkcServicing): JSX.Element => <div>{row?.totalLoan}</div>,
			sortable: true,
			omit: false,
			maxWidth: "150px",
			minWidth: "150px",
		},
		{
			name: "Rate",
			selector: (row: DkcServicing): JSX.Element => <div>{row?.rate}</div>,
			omit: false,
			maxWidth: "100px",
			minWidth: "100px",
		},
		{
			name: "Monthly Payment",
			selector: (row: DkcServicing): JSX.Element => (
				<div>{row?.monthlyPayment}</div>
			),
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
		},
		{
			name: "Origin Date",
			selector: (row: DkcServicing): JSX.Element =>
				<div>{row?.originDate}</div> || "",
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
		},
		{
			name: "Maturity Date",
			selector: (row: DkcServicing): JSX.Element =>
				<div>{row?.maturityDate}</div> || "",
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
			when: (row: DkcServicing): boolean => {
				return validateDate(row?.maturityDate || "");
			},
			style: {
				background: "#fbf4f7",
				color: "#fe3d64",
			},
		},
		{
			name: "Insurance Expiration Date",
			selector: (row: DkcServicing): string => row?.maturityDate || "",
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
			when: (row: DkcServicing): boolean => {
				return validateDate(row?.maturityDate || "");
			},
			style: {
				background: "#fbf4f7",
				color: "#fe3d64",
			},
		},
		{
			name: "Taxed Paid",
			maxWidth: "50px",
			selector: (row: DkcServicing): JSX.Element => (
				<div key={row.id}>
					<Toggle
						checkedClassName="bg-green-500"
						checkLabel="Paid"
						checkLabelClassName="text-black text-[13px]"
						checked={false}
					/>
				</div>
			),
			omit: false,
		},
	];

	const data = [
		{
			id: "v1w2x3y4z5",
			borrower: "Sunrise Bakery",
			collateralAddress:
				"2001 Bread St, San Diego, CA 92000 & 2002 Pastry Ln, San Diego, CA 92001",
			totalLoan: "$90,000.00",
			rate: "6%",
			monthlyPayment: "$1,080.00",
			originDate: "03-11-2022",
			maturityDate: "03-11-2023",
		},
		{
			id: "a1b2c3d4e6",
			borrower: "Outdoor Adventure Co.",
			collateralAddress:
				"3003 Mountain Rd, Denver, CO 80100 & 3004 River Ln, Denver, CO 80101",
			totalLoan: "$110,000.00",
			rate: "7%",
			monthlyPayment: "$1,320.00",
			originDate: "07-14-2022",
			maturityDate: "07-14-2023",
		},
		{
			id: "f1g2h3i4j6",
			borrower: "Family Dentistry",
			collateralAddress:
				"4005 Cavity Blvd, Houston, TX 77000 & 4006 Smile Rd, Houston, TX 77001",
			totalLoan: "$80,000.00",
			rate: "5%",
			monthlyPayment: "$800.00",
			originDate: "11-21-2022",
			maturityDate: "11-21-2023",
		},
		{
			id: "k1l2m3n4o6",
			borrower: "PetCare Store",
			collateralAddress:
				"5007 Paw St, Dallas, TX 75000 & 5008 Fur Ln, Dallas, TX 75001",
			totalLoan: "$65,000.00",
			rate: "4%",
			monthlyPayment: "$520.00",
			originDate: "05-09-2022",
			maturityDate: "05-09-2023",
		},
		{
			id: "p1q2r3s4t6",
			borrower: "FreshFruits Market",
			collateralAddress:
				"6009 Apple Rd, Atlanta, GA 30300 & 6010 Orange Ln, Atlanta, GA 30301",
			totalLoan: "$95,000.00",
			rate: "6%",
			monthlyPayment: "$1,140.00",
			originDate: "04-22-2022",
			maturityDate: "04-22-2023",
		},
		{
			id: "u1v2w3x4y6",
			borrower: "BookNook Store",
			collateralAddress:
				"7001 Page Blvd, Orlando, FL 32800 & 7002 Novel Rd, Orlando, FL 32801",
			totalLoan: "$70,000.00",
			rate: "5%",
			monthlyPayment: "$700.00",
			originDate: "08-13-2022",
			maturityDate: "08-13-2023",
		},
		{
			id: "z1a2b3c4d6",
			borrower: "CoffeeCup Café",
			collateralAddress:
				"8003 Java St, Seattle, WA 98000 & 8004 Brew Ln, Seattle, WA 98001",
			totalLoan: "$120,000.00",
			rate: "8%",
			monthlyPayment: "$1,440.00",
			originDate: "09-25-2022",
			maturityDate: "09-25-2023",
		},
		{
			id: "e1f2g3h4i6",
			borrower: "QuickClean Laundromat",
			collateralAddress:
				"9005 Wash St, Las Vegas, NV 89000 & 9006 Soap Ln, Las Vegas, NV 89001",
			totalLoan: "$40,000.00",
			rate: "3%",
			monthlyPayment: "$400.00",
			originDate: "10-11-2022",
			maturityDate: "10-11-2023",
		},
		{
			id: "j1k2l3m4n6",
			borrower: "eGadget Store",
			collateralAddress:
				"10007 Tech Blvd, San Francisco, CA 94000 & 10008 Gadget Rd, San Francisco, CA 94001",
			totalLoan: "$150,000.00",
			rate: "9%",
			monthlyPayment: "$1,800.00",
			originDate: "12-15-2022",
			maturityDate: "12-15-2023",
		},
	];

	return (
		<>
			<ServicingTable
				handleSearchValue={handleSearch}
				columns={columns}
				data={data}
				widthSearch="60px"
			>
				<>
					<div className="relative w-[115px]">
						<div className="absolute w-[200px]" style={{ top: "-8px" }}>
							<BreadCrumb initialTab="Servicing" actualTab="DKC Lending LLC" />
						</div>
					</div>
					<div>
						<div className="relative z-10">
							<Tabs tabs={servicingTabs} actualTab="dkc lending llc" />
						</div>
					</div>
				</>
			</ServicingTable>

			<ServicingModal />
		</>
	);
};
