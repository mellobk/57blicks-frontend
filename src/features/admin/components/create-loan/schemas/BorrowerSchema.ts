import * as z from "zod";
import { UserSchema } from "@/features/admin/components/create-loan/schemas/UserSchema";
import { errorMessages } from "@/utils/error-messages";

export const BorrowerSchema = z.object({
	accountNumber: z.string().max(500, errorMessages.maxLength).optional(),
	accountName: z.string().optional(),
	accountType: z.string().optional(),
	bankingName: z.string().optional(),
	llc: z.string().nonempty(errorMessages.required),
	routingNumber: z.string().optional(),
	ssnEin: z.string().optional(),
	user: UserSchema,
});
