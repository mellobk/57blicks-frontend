import type {
	FundingBreakdown,
	Loan,
} from "@/features/admin/components/create-loan/types/fields";
import { LENDERS } from "@/features/admin/components/create-loan/utils/selects";

export const defaultFundingBreakdown: FundingBreakdown[] = [
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
];

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
	fundingBreakdown: defaultFundingBreakdown,
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
