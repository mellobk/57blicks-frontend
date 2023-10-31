export enum PermissionType {
	// Admin related permissions
	INVITE_ADMINS = "invite admins",
	INVITE_ACCOUNTERS = "invite accounters",
	INVITE_INVESTORS = "invite investors",
	VIEW_INVESTORS = "view investors",
	VIEW_ADMINS = "view admins",
	VIEW_ACCOUNTS = "view accounts",
	EDIT_ADMINS = "edit admins",
	EDIT_INVESTORS = "edit investors",
	EDIT_ACCOUNTING = "edit accounting",
	EDIT_BORROWERS = "edit borrowers",
	DISABLE_USERS = "disable users",
	APPROVE_USERS_MODIFICATIONS = "approve users modifications",
	GRANT_PERMISSIONS = "grant permissions",

	// Loan related permissions
	CREATE_LOAN = "create loan",
	VIEW_LOANS = "view loans",
	INPUT_TRANSACTIONS_LEDGER = "input transactions ledger",
	APPROVE_NEW_LOANS = "approve new loans",
	APPROVE_LOAN_CHANGES = "approve loan changes",
	SEND_INVOICE = "send invoice",
	LOAN_OVERVIEW = "loan overview",

	// Opportunity related permissions
	CREATE_OPPORTUNITY = "create opportunity",
	VIEW_OPPORTUNITIES = "view opportunities",
	EDIT_OPPORTUNITIES = "edit opportunities",
	SEND_OPPORTUNITIES = "send opportunities",
	DOWNLOAD_OPPORTUNITIES = "download opportunities",
	APPROVE_OPPORTUNITIES = "approve opportunities",

	// Miscellaneous permissions
	REPORTING = "reporting",
	VIEW_PQRS = "view pqrs",
	EDIT_PQRS = "edit pqrs",
}

export enum RoleType {
	SUPER_ADMIN = "super-admin",
	ADMIN = "admin",
	INVESTOR = "investor",
	ACCOUNTING = "accounting",
	BORROWER = "borrower",
}
