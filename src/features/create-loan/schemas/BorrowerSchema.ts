import * as z from "zod";
import { UserSchema } from "@/features/create-loan/schemas/UserSchema";
import { errorMessages } from "@/utils/error-messages";

export const BorrowerSchema = z.object({
	accountNumber: z.string(),
	accountType: z.string(),
	bankingName: z.string(),
	llc: z.string().min(1, { message: errorMessages.required }),
	routingNumber: z.string(),
	ssnEin: z
		.string()
		.min(9, { message: errorMessages.minLength })
		.max(9, { message: errorMessages.maxLength }),
	user: UserSchema,
});
