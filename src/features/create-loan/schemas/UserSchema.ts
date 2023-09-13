import * as z from "zod";
import { errorMessages } from "@/utils/error-messages";

export const UserSchema = z.object({
	email: z
		.string()
		.email(errorMessages.email)
		.min(1, { message: errorMessages.required })
		.max(30, { message: errorMessages.maxLength }),
	firstName: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(25, { message: errorMessages.maxLength }),
	lastName: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(25, { message: errorMessages.maxLength }),
	mailingAddress: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(100, { message: errorMessages.maxLength }),
	phoneNumber: z
		.string()
		.min(14, { message: errorMessages.minLength })
		.max(14, { message: errorMessages.maxLength }),
});
