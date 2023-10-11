import * as z from "zod";
import { BorrowerSchema } from "@/features/create-loan/schemas/BorrowerSchema";
import { CollateralSchema } from "@/features/create-loan/schemas/CollateralSchema";
import { FundingBreakdownSchema } from "@/features/create-loan/schemas/FundingBreakdownSchema";
import { errorMessages } from "@/utils/error-messages";

export const LoanSchema = z.object({
	amountDrawn: z
		.string()
		.nonempty(errorMessages.required)
		.max(15, errorMessages.maxLength),
	borrower: BorrowerSchema,
	collaterals: z.array(CollateralSchema),
	constructionHoldback: z
		.string()
		.nonempty(errorMessages.required)
		.max(15, errorMessages.maxLength),
	fundingBreakdown: z.array(FundingBreakdownSchema),
	interestRate: z
		.string()
		.nonempty(errorMessages.required)
		.max(5, errorMessages.maxLength),
	leadSource: z.string().nonempty(errorMessages.required),
	loanConsultant: z
		.string()
		.nonempty(errorMessages.required)
		.max(100, errorMessages.maxLength),
	ltv: z
		.string()
		.nonempty(errorMessages.required)
		.max(5, errorMessages.maxLength),
	maturityDate: z
		.string()
		.nonempty(errorMessages.required)
		.min(10, errorMessages.minLength)
		.max(10, errorMessages.maxLength),
	originationDate: z
		.string()
		.nonempty(errorMessages.required)
		.min(10, errorMessages.minLength)
		.max(10, errorMessages.maxLength),
	participationBreakdown: z.array(FundingBreakdownSchema),
	prepaymentPenalty: z
		.string()
		.nonempty(errorMessages.required)
		.max(100, errorMessages.maxLength),
	totalLoanAmount: z
		.string()
		.nonempty(errorMessages.required)
		.max(15, errorMessages.maxLength),
	type: z.string().nonempty(errorMessages.required),
});
