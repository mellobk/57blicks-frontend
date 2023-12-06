export enum TicketStatusType {
	NEW = "NEW",
	OPEN = "OPEN",
	PENDING = "PENDING",
	CLOSED = "CLOSED",
}

export enum TicketPriorityType {
	LOW = "LOW",
	MEDIUM = "MEDIUM",
	HIGH = "HIGH",
}

export enum TicketCategoryType {
	INVESTMENT = "INVESTMENT",
	GENERAL = "GENERAL",
	PORTAL = "PORTAL",
	OPPORTUNITY = "OPPORTUNITY",
	OTHER = "OTHER",
}

export interface Ticket {
	id: string;
	title: string;
	description: string;
	priority?: TicketPriorityType;
	status?: TicketStatusType;
	category?: TicketCategoryType;
	createdAt?: Date;
	updatedAt?: Date;
	deleteAt?: Date;
	userId?: string;
}

export interface CreateTicketForm {
	id: string;
	title: string;
	description: string;
	category: TicketCategoryType;
	status: TicketStatusType;
}

export interface Attachment {
	id: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
	originalName?: string;
	mimeType?: string;
	size?: string;
	s3Url?: string;
	ticketId: string;
	data?: Array<Attachment>;
}
export interface Chat {
	id: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
	content?: string;
	isInternal: boolean,
	ticketId: string
	data?: Array<Chat>;

}