export enum PermissionType {
	INVITE_ADMINS = "Invite admins",
	INVITE_ACCOUNTERS = "Invite accounters",
	INVITE_INVESTORS = "Invite investors",
	VIEW_INVESTORS = "View investors",
	VIEW_ADMINS = "View admins",
	VIEW_ACCOUNTS = "View accounts",
	EDIT_ADMINS = "Edit admins",
	EDIT_INVESTORS = "Edit investors",
	EDIT_ACCOUNTING = "Edit accounting",
	EDIT_BORROWERS = "Edit borrowers",
	DISABLE_USERS = "Disable users",
	APPROVE_USERS_MODIFICATIONS = "Approve users modifications",

	// Loan related permissions
	CREATE_LOAN = "Create loan",
	VIEW_LOANS = "View loans",
	INPUT_TRANSACTIONS_LEDGER = "Input transactions ledger",
	APPROVE_NEW_LOANS = "Approve new loans",
	APPROVE_LOAN_CHANGES = "Approve loan changes",
	SEND_INVOICE = "Send invoice",
	LOAN_OVERVIEW = "Loan overview",

	// Opportunity related permissions
	CREATE_OPPORTUNITY = "Create opportunity",
	VIEW_OPPORTUNITIES = "View opportunities",
	EDIT_OPPORTUNITIES = "Edit opportunities",
	SEND_OPPORTUNITIES = "Send opportunities",
	DOWNLOAD_OPPORTUNITIES = "Download opportunities",
	APPROVE_OPPORTUNITIES = "Approve opportunities",

	// Miscellaneous permissions
	REPORTING = "Reporting",
	VIEW_PQRS = "View pqrs",
	EDIT_PQRS = "Edit pqrs",
}

export enum RoleType {
	SUPER_ADMIN = "super-admin",
	ADMIN = "admin",
	INVESTOR = "investor",
	ACCOUNTING = "accounting",
	BORROWER = "borrower",
}
