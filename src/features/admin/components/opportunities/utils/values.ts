import { Opportunity } from "@/features/admin/components/opportunities/types/fields";

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
	investmentMonthlyInterestedOfferedToInvestor: "",
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
