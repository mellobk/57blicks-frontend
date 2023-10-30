import * as z from "zod";
import { UserSchema } from "@/features/admin/components/create-loan/schemas/UserSchema";
import { errorMessages } from "@/utils/error-messages";

export const BorrowerSchema = z.object({
	accountNumber: z.string().max(50, errorMessages.maxLength).optional(),
	accountType: z.string().optional(),
	bankingName: z.string().max(50, errorMessages.maxLength).optional(),
	llc: z
		.string()
		.nonempty(errorMessages.required)
		.max(100, errorMessages.maxLength),
	routingNumber: z.string().max(50, errorMessages.maxLength).optional(),
	ssnEin: z
		.string()
		.min(9, errorMessages.minLength)
		.max(9, errorMessages.maxLength),
	user: UserSchema,
});
