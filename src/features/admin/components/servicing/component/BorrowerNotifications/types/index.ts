export interface BorrowerNotificationType {
	name: string;
	url: string;
}

export const notificationTypes: Array<BorrowerNotificationType> = [
	{ name: "Tax Default", url: "tax-default" },
	{ name: "Interest Default", url: "interest-default" },
	{ name: "Unauthorized Default", url: "unauthorized-default" },
	{ name: "Insurance Default", url: "insurance-default" },
	{
		name: "Loan Maturity Notice",
		url: "borrower-notification-loan-maturity",
	},
	{ name: "Property Tax Reminder", url: "property-tax" },
	{
		name: "Property Tax Requirements & Guidelines",
		url: "property-tax-requirements-guidelines",
	},
];
