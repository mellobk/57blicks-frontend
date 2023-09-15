import * as z from "zod";
import { CollateralSchema } from "@/features/create-loan/schemas/CollateralSchema";
import { BorrowerSchema } from "@/features/create-loan/schemas/BorrowerSchema";
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
	interestRate: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(100, { message: errorMessages.maxLength }),
	maturityDate: z.string().min(1, { message: errorMessages.required }),
	originationDate: z.string().min(1, { message: errorMessages.required }),
	prepaymentPenalty: z.string().min(1, { message: errorMessages.required }),
	totalLoanAmount: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(12, { message: errorMessages.maxLength }),
	type: z.string().min(1, { message: errorMessages.required }),
});
