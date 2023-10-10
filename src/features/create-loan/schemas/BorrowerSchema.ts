import * as z from "zod";
import { UserSchema } from "@/features/create-loan/schemas/UserSchema";
import { errorMessages } from "@/utils/error-messages";

export const BorrowerSchema = z.object({
	accountNumber: z.string().max(50, { message: errorMessages.maxLength }).optional(),
	accountType: z.string().optional(),
	bankingName: z.string().max(50, { message: errorMessages.maxLength }).optional(),
	llc: z.string().nonempty(errorMessages.required).max(100, { message: errorMessages.maxLength }),
	routingNumber: z.string().max(50, { message: errorMessages.maxLength }).optional(),
	ssnEin: z
		.string()
		.min(9, { message: errorMessages.minLength })
		.max(9, { message: errorMessages.maxLength }),
	user: UserSchema,
});
