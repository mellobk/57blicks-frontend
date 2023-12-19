import * as z from "zod";

import { BorrowerSchema } from "@/features/admin/components/create-loan/schemas/BorrowerSchema";
import { CollateralSchema } from "@/features/admin/components/create-loan/schemas/CollateralSchema";
import { FundingBreakdownSchema } from "@/features/admin/components/create-loan/schemas/FundingBreakdownSchema";
import { errorMessages } from "@/utils/error-messages";

export const LoanSchema = z.object({
	amountDrawn: z.string().nonempty(errorMessages.required),
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
		.max(100, errorMessages.maxLength),
	maturityDate: z.string().nonempty(errorMessages.required),
	originationDate: z.string().nonempty(errorMessages.required),
	participationBreakdown: z.array(FundingBreakdownSchema),
	prepaymentPenalty: z.string().nonempty(errorMessages.required),
	totalLoanAmount: z.string().nonempty(errorMessages.required),
	prorated: z
		.string()
		.nonempty(errorMessages.required)
		.max(100, errorMessages.maxLength),
	principal: z.string().nonempty(errorMessages.required),
	balance: z.string().nonempty(errorMessages.required),
	regular: z.string().nonempty(errorMessages.required),
	current: z.string().nonempty(errorMessages.required),
	type: z.string().nonempty(errorMessages.required),
});
