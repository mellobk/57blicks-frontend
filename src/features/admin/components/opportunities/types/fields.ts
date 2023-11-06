export type InvestorsNotifications = {
	email: boolean;
	investorId: string;
	note?: string;
	sms: boolean;
};

export type Opportunity = {
	id: string;
	additionalInformation: string;
	assetValue: string;
	dkcRepeatBorrower: string;
	documentS3Path: string;
	googleDriveLink: string;
	image: any;
	referenceId: number;
	investmentBorrower: string;
	investmentBorrowerBackground: string;
	investmentCollateral: string;
	investmentMonthlyInterestedOfferedToInvestor: string;
	investmentPermanentPenalty: string;
	investmentSummary: string;
	investorsNotifications: Array<InvestorsNotifications>;
	loanAmount: string;
	loanTerm: string;
	loanToValue: string;
	loanType: string;
	participantOpportunities: {
		"99%": string;
		"75%": string;
		"50%": string;
	};
	postTitle: string;
};
