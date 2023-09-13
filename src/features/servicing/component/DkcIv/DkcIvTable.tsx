import { useState } from "react";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import type { DkcServicing } from "../../types/api";
import { servicingTabs } from "../../utils/tabs";
import { ServicingTable } from "../ServicingTable";
import { Toggle } from "@/components/ui/Toggle";

interface SuccessProps {}

export const DkcIvTable: React.FC<SuccessProps> = () => {
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
			id: "x1y2z3a4b5",
			borrower: "Skyline Realty",
			collateralAddress:
				"101 Skyscraper Ave, Denver, CO 80000 & 102 Tower St, Denver, CO 80001",
			totalLoan: "$300,000.00",
			rate: "15%",
			monthlyPayment: "$4,500.00",
			originDate: "05-15-2022",
			maturityDate: "05-15-2023",
		},
		{
			id: "c1d2e3f4g5",
			borrower: "Moonlight Brewery",
			collateralAddress:
				"201 Ale St, Portland, OR 97000 & 202 Lager Ln, Portland, OR 97001",
			totalLoan: "$100,000.00",
			rate: "5%",
			monthlyPayment: "$1,000.00",
			originDate: "02-20-2022",
			maturityDate: "02-20-2023",
		},
		{
			id: "h1i2j3k4l5",
			borrower: "GreenGrocer Markets",
			collateralAddress:
				"303 Veggie Blvd, Raleigh, NC 27500 & 304 Fruit Rd, Raleigh, NC 27501",
			totalLoan: "$75,000.00",
			rate: "4%",
			monthlyPayment: "$750.00",
			originDate: "07-01-2022",
			maturityDate: "07-01-2023",
		},
		{
			id: "m1n2o3p4q5",
			borrower: "Midtown Motors",
			collateralAddress:
				"405 Car St, Detroit, MI 48000 & 406 Auto Ave, Detroit, MI 48001",
			totalLoan: "$200,000.00",
			rate: "8%",
			monthlyPayment: "$1,600.00",
			originDate: "11-25-2022",
			maturityDate: "11-25-2023",
		},
		{
			id: "r1s2t3u4v5",
			borrower: "BeachView Resorts",
			collateralAddress:
				"507 Ocean Rd, Miami, FL 33000 & 508 Sea Ln, Miami, FL 33001",
			totalLoan: "$500,000.00",
			rate: "20%",
			monthlyPayment: "$10,000.00",
			originDate: "08-10-2022",
			maturityDate: "08-10-2023",
		},
		{
			id: "w1x2y3z4a5",
			borrower: "EduFirst Academy",
			collateralAddress:
				"609 School St, Boston, MA 02100 & 610 Campus Ln, Boston, MA 02101",
			totalLoan: "$250,000.00",
			rate: "10%",
			monthlyPayment: "$2,500.00",
			originDate: "09-15-2022",
			maturityDate: "09-15-2023",
		},
		{
			id: "b1c2d3e4f5",
			borrower: "QuickFix Mechanics",
			collateralAddress:
				"711 Repair St, San Jose, CA 94000 & 712 Tuneup Ln, San Jose, CA 94001",
			totalLoan: "$50,000.00",
			rate: "3%",
			monthlyPayment: "$500.00",
			originDate: "10-20-2022",
			maturityDate: "10-20-2023",
		},
		{
			id: "g1h2i3j4k5",
			borrower: "CloudSoft Software",
			collateralAddress:
				"813 App St, Seattle, WA 98100 & 814 Code Ln, Seattle, WA 98101",
			totalLoan: "$300,000.00",
			rate: "15%",
			monthlyPayment: "$4,500.00",
			originDate: "03-12-2022",
			maturityDate: "03-12-2023",
		},
		{
			id: "l1m2n3o4p5",
			borrower: "Vintage Apparel",
			collateralAddress:
				"915 Fashion St, New York, NY 10000 & 916 Style Ln, New York, NY 10001",
			totalLoan: "$100,000.00",
			rate: "5%",
			monthlyPayment: "$1,000.00",
			originDate: "06-30-2022",
			maturityDate: "06-30-2023",
		},
		{
			id: "q1r2s3t4u5",
			borrower: "Wellness Clinic",
			collateralAddress:
				"1017 Health St, San Francisco, CA 94100 & 1018 Care Ln, San Francisco, CA 94101",
			totalLoan: "$350,000.00",
			rate: "18%",
			monthlyPayment: "$6,300.00",
			originDate: "01-05-2022",
			maturityDate: "01-05-2023",
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
							<BreadCrumb initialTab="Servicing" actualTab="DKC Lending IV" />
						</div>
					</div>

					<div className="relative z-10">
						<Tabs tabs={servicingTabs} actualTab="dkc lending iv" />
					</div>
				</>
			</ServicingTable>
		</>
	);
};
