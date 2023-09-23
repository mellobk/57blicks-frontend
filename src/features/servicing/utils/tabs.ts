export const tabs = [
	{ label: "Admins", routeTo: "manage-users/admins" },
	{ label: "Investors", routeTo: "manage-users/investors" },
	{ label: "Accounting", routeTo: "manage-users/accounting" },
];

export const servicingTabs = [
	{ label: "DKC Lending LLC", routeTo: "servicing/dkc-llc" },
	{ label: "DKC Lending FL", routeTo: "servicing/dkc-fl" },
	{ label: "DKC Lending IV", routeTo: "servicing/dkc-iv" },
	{ label: "DKC Lending CL", routeTo: "servicing/dkc-cl" },
	{ label: "First Capital Trusts LLC", routeTo: "servicing/first-capital" },
];

export const servicingModalTabs = [
	{ label: "Loan", routeTo: "servicing/dkc-llc" },
	{ label: "Borrower", routeTo: "servicing/dkc-fl" },
	{ label: "Ledger", routeTo: "servicing/dkc-iv" },
	{ label: "Funding", routeTo: "servicing/dkc-cl" },
	{ label: "Invoices", routeTo: "servicing/first-capital" },
];

export const footerTabData: Array<{
	label: string;
	width: string;
	justify?: string;
}> = [
	{ label: "total: 200", width: "730px", justify: "center" },
	{ label: "$33,000.00", width: "150px" },
	{ label: "12% ", width: "100px" },
	{ label: "$467.50", width: "200px" },
	{ label: "03-23-2020", width: "200px" },
	{ label: "01-04-2022", width: "200px" },
	{ label: "01-04-2022 ", width: "250px" },
];

export const userTabs = [
	{ label: "Activity", routeTo: "manage-users/admins" },
	{ label: "Permission", routeTo: "manage-users/admins" },
	{ label: "Edit", routeTo: "manage-users/admins" },
];
