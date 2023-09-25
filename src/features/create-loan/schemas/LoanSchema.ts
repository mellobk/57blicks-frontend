import * as z from "zod";
import { BorrowerSchema } from "@/features/create-loan/schemas/BorrowerSchema";
import { CollateralSchema } from "@/features/create-loan/schemas/CollateralSchema";
import { FundingBreakdownSchema } from "@/features/create-loan/schemas/FundingBreakdownSchema";
import { errorMessages } from "@/utils/error-messages";

export const LoanSchema = z.object({
	amountDrawn: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(12, { message: errorMessages.maxLength }),
	borrower: BorrowerSchema,
	collaterals: z.array(CollateralSchema),
	constructionHoldback: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(12, { message: errorMessages.maxLength }),
	fundingBreakdown: z.array(FundingBreakdownSchema),
	interestRate: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(3, { message: errorMessages.maxLength }),
	leadSource: z.string().min(1, { message: errorMessages.required }),
	loanConsultant: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(100, { message: errorMessages.maxLength }),
	ltv: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(3, { message: errorMessages.maxLength }),
	maturityDate: z.string().min(1, { message: errorMessages.required }),
	originationDate: z.string().min(1, { message: errorMessages.required }),
	prepaymentPenalty: z.string().min(1, { message: errorMessages.required }),
	totalLoanAmount: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(12, { message: errorMessages.maxLength }),
	type: z.string().min(1, { message: errorMessages.required }),
});
