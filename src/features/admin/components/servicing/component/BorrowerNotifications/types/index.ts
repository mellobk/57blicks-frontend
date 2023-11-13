export interface BorrowerNotificationType {
	name: string;
	url: string;
	validate: boolean;
	message: string;
}

export const notificationTypes: Array<BorrowerNotificationType> = [
	{
		name: "Tax Default",
		url: "tax-default",
		validate: true,
		message:
			"Are you sure you want to send this default notification? The loan status will be updated to default.",
	},
	{
		name: "Interest Default",
		url: "interest-default",
		validate: true,
		message:
			"Are you sure you want to send this default notification? The loan status will be updated to default.",
	},
	{
		name: "Unauthorized Default",
		url: "unauthorized-default",
		validate: true,
		message:
			"Are you sure you want to send this default notification? The loan status will be updated to default.",
	},
	{
		name: "Insurance Default",
		url: "insurance-default",
		validate: true,
		message:
			"Are you sure you want to send this default notification? The loan status will be updated to default.",
	},

	{
		name: "Property Insurance Requirements",
		url: "property-insurance-requirements",
		validate: false,
		message: "",
	},
	{
		name: "Insurance Force Place",
		url: "insurance-force-place",
		validate: false,
		message: "",
	},
	{
		name: "Property Tax Requirements & Guidelines",
		url: "property-tax-requirements-guidelines",
		validate: false,
		message: "",
	},
	{
		name: "Send Custom Notification",
		url: "custom-notification",
		validate: false,
		message: "",
	},
];
