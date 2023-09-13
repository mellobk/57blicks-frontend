import { useState } from "react";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import type { DkcServicing } from "../../types/api";
import { servicingTabs } from "../../utils/tabs";
import { ServicingTable } from "../ServicingTable";
import { Toggle } from "@/components/ui/Toggle";

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
			id: "a5a8985a4a9",
			borrower: "Skematic Design Company LLC",
			collateralAddress:
				"4613 Driesler Cir, Tampa, FL 33634 & 4222 Empire PL, Tampa, FL 33610",
			totalLoan: "$280,000.00",
			rate: "12%",
			monthlyPayment: "$2,800.00",
			originDate: "00-00-0000",
			maturityDate: "10-19-2023",
		},
		{
			id: "a1b2c3d4e5",
			borrower: "Dynamic Solutions LLC",
			collateralAddress:
				"123 Main St, New York, NY 10001 & 321 Oak St, New York, NY 10002",
			totalLoan: "$250,000.00",
			rate: "10%",
			monthlyPayment: "$2,500.00",
			originDate: "01-01-2022",
			maturityDate: "01-01-2023",
		},
		{
			id: "f6g7h8i9j0",
			borrower: "Innovative Tech Corp",
			collateralAddress:
				"555 Silicon Ave, San Jose, CA 95101 & 777 Java Blvd, San Jose, CA 95102",
			totalLoan: "$300,000.00",
			rate: "12%",
			monthlyPayment: "$3,000.00",
			originDate: "05-12-2022",
			maturityDate: "05-12-2023",
		},
		{
			id: "a1b2c3d4e5",
			borrower: "Dynamic Solutions LLC",
			collateralAddress:
				"123 Main St, New York, NY 10001 & 321 Oak St, New York, NY 10002",
			totalLoan: "$250,000.00",
			rate: "10%",
			monthlyPayment: "$2,500.00",
			originDate: "01-01-2022",
			maturityDate: "01-01-2023",
		},
		{
			id: "f6g7h8i9j0",
			borrower: "Innovative Tech Corp",
			collateralAddress:
				"555 Silicon Ave, San Jose, CA 95101 & 777 Java Blvd, San Jose, CA 95102",
			totalLoan: "$300,000.00",
			rate: "12%",
			monthlyPayment: "$3,000.00",
			originDate: "05-12-2022",
			maturityDate: "05-12-2023",
		},
		{
			id: "k1l2m3n4o5",
			borrower: "Green Energy Inc",
			collateralAddress:
				"789 Elm St, Austin, TX 73301 & 987 Pine St, Austin, TX 73302",
			totalLoan: "$200,000.00",
			rate: "8%",
			monthlyPayment: "$1,600.00",
			originDate: "03-10-2022",
			maturityDate: "03-10-2023",
		},
		{
			id: "p1q2r3s4t5",
			borrower: "Global Exports Ltd",
			collateralAddress:
				"159 Harbor Rd, Seattle, WA 98101 & 753 Dock St, Seattle, WA 98102",
			totalLoan: "$270,000.00",
			rate: "11%",
			monthlyPayment: "$2,970.00",
			originDate: "06-15-2022",
			maturityDate: "06-15-2023",
		},
		{
			id: "u1v2w3x4y5",
			borrower: "HealthFirst Medical",
			collateralAddress:
				"412 Clinic Ave, San Francisco, CA 94101 & 314 Hospital Blvd, San Francisco, CA 94102",
			totalLoan: "$220,000.00",
			rate: "9%",
			monthlyPayment: "$1,980.00",
			originDate: "09-01-2022",
			maturityDate: "09-01-2023",
		},
		{
			id: "z1a2b3c4d5",
			borrower: "SkyHigh Construction",
			collateralAddress:
				"864 Tower Pl, Chicago, IL 60601 & 468 Scaffold Ln, Chicago, IL 60602",
			totalLoan: "$280,000.00",
			rate: "12%",
			monthlyPayment: "$2,800.00",
			originDate: "11-20-2022",
			maturityDate: "11-20-2023",
		},
		{
			id: "e1f2g3h4i5",
			borrower: "MindCraft Software",
			collateralAddress:
				"246 Digital Dr, Boston, MA 02101 & 642 Algorithm Ave, Boston, MA 02102",
			totalLoan: "$260,000.00",
			rate: "10%",
			monthlyPayment: "$2,600.00",
			originDate: "12-01-2022",
			maturityDate: "12-01-2023",
		},
		{
			id: "j1k2l3m4n5",
			borrower: "FarmFresh Foods",
			collateralAddress:
				"789 Organic Rd, Nashville, TN 37001 & 987 Harvest Ln, Nashville, TN 37002",
			totalLoan: "$240,000.00",
			rate: "8%",
			monthlyPayment: "$1,920.00",
			originDate: "04-25-2022",
			maturityDate: "04-25-2023",
		},
		{
			id: "o1p2q3r4s5",
			borrower: "FitnessWorld Gym",
			collateralAddress:
				"321 Gym St, Miami, FL 33101 & 123 Cardio Rd, Miami, FL 33102",
			totalLoan: "$230,000.00",
			rate: "7%",
			monthlyPayment: "$1,610.00",
			originDate: "02-18-2022",
			maturityDate: "02-18-2023",
		},
		{
			id: "t1u2v3w4x5",
			borrower: "OceanView Hotels",
			collateralAddress:
				"654 Beach Blvd, Los Angeles, CA 90001 & 456 Palms Ave, Los Angeles, CA 90002",
			totalLoan: "$290,000.00",
			rate: "13%",
			monthlyPayment: "$3,770.00",
			originDate: "07-30-2022",
			maturityDate: "07-30-2023",
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
		</>
	);
};
