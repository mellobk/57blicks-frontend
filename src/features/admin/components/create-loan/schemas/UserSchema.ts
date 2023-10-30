import * as z from "zod";
import { errorMessages } from "@/utils/error-messages.ts";

export const UserSchema = z.object({
	email: z
		.string()
		.nonempty(errorMessages.required)
		.max(100, errorMessages.maxLength)
		.email(),
	firstName: z
		.string()
		.nonempty(errorMessages.required)
		.max(25, errorMessages.maxLength),
	lastName: z
		.string()
		.nonempty(errorMessages.required)
		.max(25, errorMessages.maxLength),
	mailingAddress: z
		.string()
		.nonempty(errorMessages.required)
		.max(100, errorMessages.maxLength),
	phoneNumber: z
		.string()
		.min(14, errorMessages.minLength)
		.max(14, errorMessages.maxLength),
});
