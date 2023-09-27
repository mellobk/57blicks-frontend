import * as z from "zod";
import { errorMessages } from "@/utils/error-messages";

export const FundingBreakdownSchema = z.object({
	amount: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(12, { message: errorMessages.maxLength }),
	// lender: z.string().min(1, { message: errorMessages.required }),
	lenderId: z.string().max(100, { message: errorMessages.maxLength }).optional(),
	rate: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(3, { message: errorMessages.maxLength }),
	type: z.string().max(100, { message: errorMessages.maxLength }).optional(),
});
