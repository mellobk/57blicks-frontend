import { Opportunity } from "@/features/opportunities/types/fields";

export const defaultValues: Opportunity = {
	additionalInformation: "",
	assetValue: "",
	dkcRepeatBorrower: "",
	documentS3Path: "",
	googleDriveLink: "",
	image: null,
	investmentBorrower: "",
	investmentBorrowerBackground: "",
	investmentCollateral: "",
	investmentMonthlyInterestedOfferedToParticipant: "",
	investmentPermanentPenalty: "",
	investmentSummary: "",
	investorsNotifications: [],
	loanAmount: "",
	loanTerm: "",
	loanToValue: "",
	loanType: "",
	participantOpportunities: {
		"99%": "",
		"75%": "",
		"50%": "",
	},
	postTitle: "",
};
