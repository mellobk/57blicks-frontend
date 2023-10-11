export interface User {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	firstName?: string;
	lastName?: string;
	email?: string;
	entityName?: string;
	sub?: string;
	phoneNumber?: string;
	mailingAddress?: string;
	isActive?: boolean;
}

export interface Investor {
	target?: any;
	id: string;
	createdAt?: Date;
	updatedAt?: Date;
	ssnEin?: string;
	streetAddress?: string;
	zip?: string;
	bankingName?: string;
	routingNumber?: string;
	accountNumber?: string;
	accountType?: string;
	user?: User;
}

export interface Investment {
	createdAt: string;
	id: string;
	investor: Investor;
	notifyEmail: boolean;
	notifySms: boolean;
	status: "ACCEPTED" | "PENDING" | "REJECTED";
	updatedAt: string;
}

export interface Investor {
	target?: any;
	id: string;
	createdAt?: Date;
	updatedAt?: Date;
	ssnEin?: string;
	streetAddress?: string;
	zip?: string;
	bankingName?: string;
	routingNumber?: string;
	accountNumber?: string;
	accountType?: string;
	user?: User;
}

export interface Opportunity {
	additionalInformation: string;
	assetValue: string;
	createdAt: string;
	createdBy: string;
	dkcRepeatBorrower: boolean;
	documentS3Path: string;
	googleDriveLink: string;
	id: string;
	investmentBorrower: string;
	investmentBorrowerBackground: string;
	investmentCollateral: string;
	investmentMonthlyInterestedOfferedToParticipant: string;
	investmentPermanentPenalty: string;
	investmentSummary: string;
	investments: Array<Investment>;
	loanAmount: string;
	loanTerm: string;
	loanToValue: string;
	loanType: string;
	participantOpportunity50Percent: null | string;
	participantOpportunity75Percent: null | string;
	participantOpportunity99Percent: null | string;
	presignedDocumentUrl: string;
	postTitle: string;
	referenceId: number;
	updatedAt: string;
	updatedBy: string;
}

export interface OpportunityMin {
	createdAt: string;
	id: string;
	updatedAt: string;
	referenceId: number;
}
