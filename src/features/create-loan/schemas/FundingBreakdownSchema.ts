import * as z from "zod";
import { errorMessages } from "@/utils/error-messages";

export const FundingBreakdownSchema = z.object({
	amount: z
		.string()
		.nonempty(errorMessages.required)
		.max(15, { message: errorMessages.maxLength }),
	investorId: z
		.string()
		.max(100, { message: errorMessages.maxLength })
		.optional(),
	lenderName: z
		.string()
		.nonempty(errorMessages.required)
		.max(100, { message: errorMessages.maxLength }),
	prorated: z
		.string()
		.nonempty(errorMessages.required)
		.max(15, { message: errorMessages.maxLength }),
	rate: z
		.string()
		.nonempty(errorMessages.required)
		.max(5, { message: errorMessages.maxLength }),
	regular: z
		.string()
		.nonempty(errorMessages.required)
		.max(15, { message: errorMessages.maxLength }),
	type: z.string().max(100, { message: errorMessages.maxLength }).optional(),
});
