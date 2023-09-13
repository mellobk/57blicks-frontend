import { useState } from "react";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import type { DkcServicing } from "../../types/api";
import { servicingTabs } from "../../utils/tabs";
import { ServicingTable } from "../ServicingTable";
import { Toggle } from "@/components/ui/Toggle";

interface SuccessProps {}

export const DkcFlTable: React.FC<SuccessProps> = () => {
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
			id: "r1g2c3v4z5",
			borrower: "SafeHaven Security",
			collateralAddress:
				"777 Lock Ave, Detroit, MI 48201 & 111 Gate St, Detroit, MI 48202",
			totalLoan: "$315,000.00",
			rate: "14%",
			monthlyPayment: "$4,410.00",
			originDate: "07-15-2022",
			maturityDate: "07-15-2023",
		},
		{
			id: "a2b2x2d2e2",
			borrower: "Paws & Claws Animal Care",
			collateralAddress:
				"404 Vet Ln, Portland, OR 97201 & 505 Pet St, Portland, OR 97202",
			totalLoan: "$210,000.00",
			rate: "7%",
			monthlyPayment: "$1,470.00",
			originDate: "02-05-2022",
			maturityDate: "02-05-2023",
		},
		{
			id: "m4n3l2o9p1",
			borrower: "MarketStreet Retail",
			collateralAddress:
				"1 Mall Rd, Houston, TX 77001 & 2 Shop Ln, Houston, TX 77002",
			totalLoan: "$250,000.00",
			rate: "10%",
			monthlyPayment: "$2,500.00",
			originDate: "08-11-2022",
			maturityDate: "08-11-2023",
		},
		{
			id: "q3w4e2r5t1",
			borrower: "LocalEats Restaurant",
			collateralAddress:
				"123 Dine Rd, Las Vegas, NV 89101 & 789 Food St, Las Vegas, NV 89102",
			totalLoan: "$280,000.00",
			rate: "12%",
			monthlyPayment: "$3,360.00",
			originDate: "01-18-2022",
			maturityDate: "01-18-2023",
		},
		{
			id: "i6o7u5y3t2",
			borrower: "QuickTrans Logistics",
			collateralAddress:
				"123 Freight Ln, Memphis, TN 37501 & 789 Ship Rd, Memphis, TN 37502",
			totalLoan: "$230,000.00",
			rate: "9%",
			monthlyPayment: "$2,070.00",
			originDate: "11-15-2022",
			maturityDate: "11-15-2023",
		},
		{
			id: "a1z2e3r4t5",
			borrower: "AeroFly Airlines",
			collateralAddress:
				"123 Sky Rd, Atlanta, GA 30301 & 456 Cloud Ln, Atlanta, GA 30302",
			totalLoan: "$330,000.00",
			rate: "15%",
			monthlyPayment: "$4,950.00",
			originDate: "09-12-2022",
			maturityDate: "09-12-2023",
		},
		{
			id: "s5d4f3g2h1",
			borrower: "EdTech Learning",
			collateralAddress:
				"101 School St, Boston, MA 02101 & 202 Book Rd, Boston, MA 02102",
			totalLoan: "$225,000.00",
			rate: "10%",
			monthlyPayment: "$2,250.00",
			originDate: "05-07-2022",
			maturityDate: "05-07-2023",
		},
		{
			id: "j1k9l8m7n6",
			borrower: "GoGreen Recyclers",
			collateralAddress:
				"303 Recycle Rd, Denver, CO 80201 & 606 Trash Ln, Denver, CO 80202",
			totalLoan: "$210,000.00",
			rate: "8%",
			monthlyPayment: "$1,680.00",
			originDate: "12-24-2022",
			maturityDate: "12-24-2023",
		},
		{
			id: "r5e4w3q2w1",
			borrower: "GymFlex Fitness",
			collateralAddress:
				"909 Gym St, Phoenix, AZ 85001 & 808 Yoga Ln, Phoenix, AZ 85002",
			totalLoan: "$245,000.00",
			rate: "10%",
			monthlyPayment: "$2,450.00",
			originDate: "04-21-2022",
			maturityDate: "04-21-2023",
		},
		{
			id: "x3c4v2b6n7",
			borrower: "EasyRide Auto Dealers",
			collateralAddress:
				"202 Drive Rd, San Antonio, TX 78201 & 404 Park Ln, San Antonio, TX 78202",
			totalLoan: "$260,000.00",
			rate: "11%",
			monthlyPayment: "$2,860.00",
			originDate: "10-05-2022",
			maturityDate: "10-05-2023",
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
							<BreadCrumb initialTab="Servicing" actualTab="DKC Lending FL" />
						</div>
					</div>

					<div className="relative z-10">
						<Tabs tabs={servicingTabs} actualTab="dkc lending fl" />
					</div>
				</>
			</ServicingTable>
		</>
	);
};
