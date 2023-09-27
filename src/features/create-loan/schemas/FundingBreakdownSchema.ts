import * as z from "zod";
import { errorMessages } from "@/utils/error-messages";

export const FundingBreakdownSchema = z.object({
	amount: z
		.string()
		.nonempty({ message: errorMessages.required })
		.max(12, { message: errorMessages.maxLength }),
	lenderId: z
		.string()
		.max(100, { message: errorMessages.maxLength })
		.optional(),
	lenderName: z.string().nonempty({ message: errorMessages.required }),
	prorated: z
		.string()
		.nonempty({ message: errorMessages.required })
		.max(12, { message: errorMessages.maxLength }),
	rate: z
		.string()
		.nonempty({ message: errorMessages.required })
		.max(3, { message: errorMessages.maxLength }),
	regular: z
		.string()
		.nonempty({ message: errorMessages.required })
		.max(12, { message: errorMessages.maxLength }),
	type: z.string().max(100, { message: errorMessages.maxLength }).optional(),
});
