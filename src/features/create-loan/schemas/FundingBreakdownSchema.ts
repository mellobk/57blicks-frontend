import * as z from "zod";
import { errorMessages } from "@/utils/error-messages";

export const FundingBreakdownSchema = z.object({
	amount: z
		.string()
		.nonempty(errorMessages.required)
		.max(15, errorMessages.maxLength),
	investorId: z
		.string()
		.max(100, errorMessages.maxLength)
		.optional(),
	lenderName: z
		.string()
		.nonempty(errorMessages.required)
		.max(100, errorMessages.maxLength),
	prorated: z
		.string()
		.nonempty(errorMessages.required)
		.max(15, errorMessages.maxLength),
	rate: z
		.string()
		.nonempty(errorMessages.required)
		.max(5, errorMessages.maxLength),
	regular: z
		.string()
		.nonempty(errorMessages.required)
		.max(15, errorMessages.maxLength),
	type: z.string().max(100, errorMessages.maxLength).optional(),
});
