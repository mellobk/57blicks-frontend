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
  investorsNotifications: [];
	loanAmount: string;
	loanTerm: string;
	loanToValue: string;
	loanType: string;
	participantOpportunity50Percent: null | string;
	participantOpportunity75Percent: null | string;
	participantOpportunity99Percent: null | string;
	postTitle: string;
	updatedAt: string;
	updatedBy: string;
}
