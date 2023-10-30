import * as z from "zod";
import { errorMessages } from "@/utils/error-messages";

export const InvestorsNotificationSchema = z.object({
	email: z.boolean(),
	investorId: z
		.string()
		.nonempty(errorMessages.required)
		.max(50, errorMessages.maxLength),
	note: z.string().nonempty(errorMessages.required).optional(),
	sms: z.boolean(),
});
