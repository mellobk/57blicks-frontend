export interface Notification {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: null;
	title: string;
	content: string;
	timestamp: Date;
	redirectPath: string;
	priority: string;
	type: string;
	userFullName: string;
}

export interface UserNotification {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: null;
	userId?: string;
	notificationId?: string;
	status?: string;
	notification?: Notification;
	data?: Array<UserNotification>;
}

export enum NotificationType {
	SYSTEM = "SYSTEM",
	USER = "USER",
	TRANSACTION = "TRANSACTION",
	ALERT = "ALERT",
	TICKET = "TICKET",
	LOAN = "LOAN",
	OPPORTUNITY = "OPPORTUNITY",
	INVOICE = "INVOICE",
	LEDGER = "LEDGER",
}

export enum NotificationPriorityType {
	LOW = "LOW",
	MEDIUM = "MEDIUM",
	HIGH = "HIGH",
}

export enum LoanStatusType {
	PENDING = "PENDING",
	APPROVED = "APPROVED",
	REJECTED = "REJECTED",
	PAID = "PAID",
}

export enum ApprovalLedgerStateType {
	PENDING = "Pending",
	REJECTED = "Rejected",
	APPROVED = "Approved",
}
