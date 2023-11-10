import type { Investment } from "@/types/api/investment";

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
	investmentMonthlyInterestedOfferedToInvestor: string;
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
