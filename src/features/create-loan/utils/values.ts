import { LoanFields } from "@/features/create-loan/types/fields";
import { lenders } from "@/features/create-loan/utils/selects";

export const defaultValues: LoanFields = {
	amountDrawn: "",
	assetType: "",
	borrowerEmailAddress: "",
	borrowerLlc: "",
	borrowerPhoneNumber: "",
	collaterals: [],
	collateralAddress: "",
	collateralLink: "",
	constructionHoldback: "",
	einSsn: "",
	firstName: "",
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
	insuranceExpirationDate: "",
	interestRate: "",
	lastName: "",
	loanType: "",
	mailingAddress: "",
	maturityDate: "",
	originationDate: "",
	prepaymentPenalty: "",
	taxUrl: "",
	totalLoanAmount: "",
};
