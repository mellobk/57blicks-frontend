import { useState } from "react";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import type { DkcServicing } from "../../types/api";
import { servicingTabs } from "../../utils/tabs";
import { ServicingTable } from "../ServicingTable";
import { Toggle } from "@/components/ui/Toggle";

interface SuccessProps {}

export const FirstCapitalTable: React.FC<SuccessProps> = () => {
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
			id: "a7b8c9d0e1",
			borrower: "QuickFix Mechanics",
			collateralAddress:
				"1111 Engine St, Detroit, MI 48201 & 1112 Wheel Ln, Detroit, MI 48202",
			totalLoan: "$50,000.00",
			rate: "4%",
			monthlyPayment: "$600.00",
			originDate: "02-20-2022",
			maturityDate: "02-20-2023",
		},
		{
			id: "f2g3h4i5j6",
			borrower: "EduSmart Academy",
			collateralAddress:
				"1213 Learn Rd, Boston, MA 02201 & 1214 Book Blvd, Boston, MA 02202",
			totalLoan: "$75,000.00",
			rate: "5%",
			monthlyPayment: "$900.00",
			originDate: "08-25-2022",
			maturityDate: "08-25-2023",
		},
		{
			id: "k3l4m5n6o7",
			borrower: "GreenLeaf Landscaping",
			collateralAddress:
				"1315 Plant St, Portland, OR 97001 & 1316 Tree Ln, Portland, OR 97002",
			totalLoan: "$60,000.00",
			rate: "4%",
			monthlyPayment: "$720.00",
			originDate: "04-14-2022",
			maturityDate: "04-14-2023",
		},
		{
			id: "p4q5r6s7t8",
			borrower: "StyleWear Boutique",
			collateralAddress:
				"1417 Fashion Ave, New York, NY 10001 & 1418 Trendy St, New York, NY 10002",
			totalLoan: "$85,000.00",
			rate: "6%",
			monthlyPayment: "$1,020.00",
			originDate: "01-18-2022",
			maturityDate: "01-18-2023",
		},
		{
			id: "u5v6w7x8y9",
			borrower: "SeaFood Delight",
			collateralAddress:
				"1519 Fish Rd, Miami, FL 33101 & 1520 Ocean Blvd, Miami, FL 33102",
			totalLoan: "$55,000.00",
			rate: "4%",
			monthlyPayment: "$660.00",
			originDate: "07-12-2022",
			maturityDate: "07-12-2023",
		},
		{
			id: "z6a7b8c9d0",
			borrower: "TechGuru Services",
			collateralAddress:
				"1611 Code St, San Francisco, CA 94001 & 1612 Logic Ln, San Francisco, CA 94002",
			totalLoan: "$100,000.00",
			rate: "7%",
			monthlyPayment: "$1,200.00",
			originDate: "09-06-2022",
			maturityDate: "09-06-2023",
		},
		{
			id: "e7f8g9h0i1",
			borrower: "TravelEase Agency",
			collateralAddress:
				"1713 Flight Rd, Atlanta, GA 30301 & 1714 Journey Ln, Atlanta, GA 30302",
			totalLoan: "$70,000.00",
			rate: "5%",
			monthlyPayment: "$840.00",
			originDate: "11-22-2022",
			maturityDate: "11-22-2023",
		},
		{
			id: "j8k9l0m1n2",
			borrower: "HomeDecor Plus",
			collateralAddress:
				"1815 Decor Ave, Dallas, TX 75201 & 1816 Style St, Dallas, TX 75202",
			totalLoan: "$80,000.00",
			rate: "6%",
			monthlyPayment: "$960.00",
			originDate: "05-19-2022",
			maturityDate: "05-19-2023",
		},
		{
			id: "o9p0q1r2s3",
			borrower: "HealthyEats Restaurant",
			collateralAddress:
				"1917 Fresh St, Chicago, IL 60601 & 1918 Vegan Ln, Chicago, IL 60602",
			totalLoan: "$65,000.00",
			rate: "4%",
			monthlyPayment: "$780.00",
			originDate: "03-24-2022",
			maturityDate: "03-24-2023",
		},
		{
			id: "t0u1v2w3x4",
			borrower: "AutoZoom Dealership",
			collateralAddress:
				"2019 Drive Rd, Los Angeles, CA 90001 & 2020 Speed Ln, Los Angeles, CA 90002",
			totalLoan: "$200,000.00",
			rate: "9%",
			monthlyPayment: "$2,400.00",
			originDate: "10-31-2022",
			maturityDate: "10-31-2023",
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
						<div className="absolute w-[230px]" style={{ top: "-8px" }}>
							<BreadCrumb
								initialTab="Servicing"
								actualTab="First Capital Trusts LLC"
							/>
						</div>
					</div>

					<div className="relative z-10">
						<Tabs tabs={servicingTabs} actualTab="first capital trusts llc" />
					</div>
				</>
			</ServicingTable>
		</>
	);
};
