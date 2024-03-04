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
	{ label: "DKC Lending V", routeTo: "servicing/dkc-v" },
];

export const servicingInvestorTabs = [
	{ label: "DKC Lending LLC", routeTo: "investor-portals/dkc-llc" },
	{ label: "DKC Lending FL", routeTo: "investor-portals/dkc-fl" },
	{ label: "DKC Lending IV", routeTo: "investor-portals/dkc-iv" },
	{ label: "DKC Lending CL", routeTo: "investor-portals/dkc-cl" },
	{ label: "DKC Lending V", routeTo: "investor-portals/dkc-v" },
];

export const approveModalTabs = [
	{ label: "Loan", routeTo: "servicing/dkc-llc" },
	{ label: "Borrower", routeTo: "servicing/dkc-fl" },
	{ label: "Ledger", routeTo: "servicing/dkc-iv" },
	{ label: "Funding", routeTo: "servicing/dkc-iv" },
];
export const paidLoansTabs = [
	{ label: "30", value: "30", routeTo: "30" },
	{ label: "60", value: "60", routeTo: "60" },
	{ label: "90", value: "90", routeTo: "90" },
	{ label: "YTD", value: "", routeTo: "" },
];

export const consultantsTabs = [
	{
		value: "all",
		label: "All",
		routeTo: "All",
	},
	{
		value: "currentMonthToDate",
		label: "Current month to date",
		routeTo: "30",
	},
	{ value: "past30Days", label: "Past 30 days", routeTo: "30" },
	{
		value: "breakdownPerQuarter",
		label: "Breakdown per Quarter",
		routeTo: "30",
	},
	{ value: "YTD", label: "Year to Date", routeTo: "30" },
	{ value: "yearOverYear", label: "Year over Year", routeTo: "30" },
];

export const loansTabs = [
	{ label: "Consultants", value: "consultants", routeTo: "consultants" },
	{ label: "Asset Types", value: "asset types", routeTo: "asset types" },
	{ label: "Products", value: "products", routeTo: "products" },
];

export const loansRollTabs = [
	{ label: "alls", value: "alls", routeTo: "alls" },
	{ label: "Asset Types", value: "asset types", routeTo: "asset types" },
	{ label: "Products", value: "products", routeTo: "products" },
];

export const newFoundedTabs = [
	{ label: "30", value: "30", routeTo: "30" },
	{ label: "60", value: "60", routeTo: "60" },
	{ label: "90", value: "90", routeTo: "90" },
];

export const insuranceTabs = [
	{ label: "Expired", value: "expired", routeTo: "expired" },
	{ label: "30", value: "30", routeTo: "30" },
	{ label: "60", value: "60", routeTo: "60" },
	{ label: "90", value: "90", routeTo: "90" },
];

export const newInterestTabs = [
	{ label: "Month", value: "Month", routeTo: "Month" },
	{ label: "YTD", value: "YTD", routeTo: "YTD" },
];

export const userTabs = [
	{ label: "Activity", routeTo: "manage-users/admins" },
	{ label: "Permission", routeTo: "manage-users/admins" },
	{ label: "Edit", routeTo: "manage-users/admins" },
];

export const userTabsData = {
	activity: { label: "Activity", routeTo: "manage-users/admins" },
	permission: { label: "Permission", routeTo: "manage-users/admins" },
	edit: { label: "Edit", routeTo: "manage-users/admins" },
	empty: { label: "", routeTo: "" },
};

export const investorUserTabs = [
	{ label: "Activity", routeTo: "manage-users/admins" },
	{ label: "Edit", routeTo: "manage-users/admins" },
];

export const servicingModalTabs = [
	{ label: "Loan", routeTo: "servicing/dkc-llc" },
	{ label: "Borrower", routeTo: "servicing/dkc-fl" },
	{ label: "Ledger", routeTo: "servicing/dkc-iv" },
	{ label: "Receivable", routeTo: "servicing/dkc-iv" },
	{ label: "Payable", routeTo: "servicing/dkc-iv" },
	{ label: "Funding", routeTo: "servicing/dkc-cl" },
	{ label: "Invoices", routeTo: "servicing/dkc-v" },
];
