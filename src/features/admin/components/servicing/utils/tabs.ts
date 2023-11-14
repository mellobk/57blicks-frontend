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

export const approveModalTabs = [
	{ label: "Loan", routeTo: "servicing/dkc-llc" },
	{ label: "Borrower", routeTo: "servicing/dkc-fl" },
	{ label: "Ledger", routeTo: "servicing/dkc-iv" },
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
	{ label: "Invoices", routeTo: "servicing/first-capital" },
];