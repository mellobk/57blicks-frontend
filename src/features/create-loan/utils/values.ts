import type { Loan } from "@/features/create-loan/types/fields";
import { LENDERS } from "@/features/create-loan/utils/selects";

export const defaultValues: Loan = {
	amountDrawn: "",
	borrower: {
		llc: "",
		ssnEin: "",
		user: {
			email: "",
			firstName: "",
			lastName: "",
			mailingAddress: "",
			phoneNumber: "",
		},
	},
	collaterals: [
		{
			address: "",
			assetType: "",
			insuranceExpirationDate: "",
			link: "",
			taxUrl: "",
		},
	],
	constructionHoldback: "",
	fundingBreakdown: [
		{
			amount: "",
			investorId: LENDERS[0]?.code,
			lenderName: LENDERS[0]?.name || "DKC Lending LLC",
			prorated: "0",
			rate: "",
			regular: "0",
		},
		{
			amount: "",
			lenderName: "DKC Servicing Fee Income",
			prorated: "0",
			rate: "",
			regular: "0",
		},
		{
			amount: "",
			lenderName: "Yield Spread",
			prorated: "0",
			rate: "",
			regular: "0",
		},
	],
	interestRate: "",
	leadSource: "",
	loanConsultant: "",
	ltv: "",
	maturityDate: "",
	originationDate: "",
	participationBreakdown: [],
	prepaymentPenalty: "",
	totalLoanAmount: "",
	type: "",
};
