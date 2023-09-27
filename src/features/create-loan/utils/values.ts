import { Loan } from "@/features/create-loan/types/fields";
import { LENDERS } from "@/features/create-loan/utils/selects";

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
			lenderId: LENDERS[0]?.code,
      lenderName: LENDERS[0]?.name || "DKC Lending LLC",
      prorate: "",
			rate: "",
			regular: "",
			type: "lender",
		},
		{
			amount: "",
			lenderName: "DKC Servicing Fee Income",
      prorate: "",
      rate: "",
      regular: "",
		},
		{
			amount: "",
      lenderName: "Yield Spread (optional)",
      prorate: "",
      rate: "",
      regular: "",
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
