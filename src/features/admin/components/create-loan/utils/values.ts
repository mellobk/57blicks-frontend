import { LENDERS } from "@/features/admin/components/create-loan/utils/selects";
import type { Loan } from "@/features/admin/components/create-loan/types/fields";

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
			constructionHoldback: "0",
			investorId: LENDERS[0]?.code,
			lenderName: LENDERS[0]?.name || "DKC Lending LLC",
			prorated: "0",
			rate: "",
			regular: "0",
			type: "Lender",
		},
		{
			amount: "0",
			constructionHoldback: "0",
			investorId: "servicing",
			lenderName: "DKC Servicing Fee Income",
			prorated: "0",
			rate: "0",
			regular: "0",
			type: "Servicing",
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
