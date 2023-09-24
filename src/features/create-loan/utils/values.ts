import { Loan } from "@/features/create-loan/types/fields";
import { lenders } from "@/features/create-loan/utils/selects";

export const defaultValues: Loan = {
	amountDrawn: "",
	borrower: {
		accountNumber: "",
		accountType: "",
		bankingName: "",
		llc: "",
		routingNumber: "",
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
			lender: lenders[0]?.name || "DKC Lending LLC",
			lenderId: lenders[0]?.code,
			rate: "",
			type: "lender",
		},
		{
			amount: "",
			lender: "DKC Servicing Fee Income",
			rate: "",
		},
		{
			amount: "",
			lender: "Yield Spread (optional)",
			rate: "",
		},
	],
	interestRate: "",
  leadSource: "",
  loanConsultant: "",
  ltv: "",
	maturityDate: "",
	originationDate: "",
	prepaymentPenalty: "",
	totalLoanAmount: "",
	type: "",
};
