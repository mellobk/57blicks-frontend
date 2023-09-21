export type Investor = {
	email: boolean;
	investorId: string;
	note?: string;
	sms: boolean;
};

export type Opportunity = {
	additionalInformation: string;
	assetValue: string;
	dkcRepeatBorrower: string;
	googleDriveLink: string;
	image: any;
	investmentBorrower: string;
	investmentBorrowerBackground: string;
	investmentCollateral: string;
	investmentMonthlyInterestedOfferedToParticipant: string;
	investmentPermanentPenalty: string;
	investmentSummary: string;
	investors: Investor[];
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
