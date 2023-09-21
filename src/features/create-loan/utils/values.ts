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
			amount: 0,
			lender: lenders[0]?.name || "DKC Lending LLC",
			lenderId: lenders[0]?.code,
			rate: 0,
			type: "lender",
		},
		{
			amount: 0,
			lender: "DKC Servicing Fee Income",
			rate: 0,
		},
		{
			amount: 0,
			lender: "Yield Spread (optional)",
			rate: 0,
		},
	],
	interestRate: "",
	maturityDate: "",
	originationDate: "",
	prepaymentPenalty: "",
	totalLoanAmount: "",
	type: "",
};
