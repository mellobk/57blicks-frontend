import * as z from "zod";
import { errorMessages } from "@/utils/error-messages.ts";

export const userAdminEditSchema = z.object({
	email: z.string().nonempty(errorMessages.required),
	mailingAddress: z.string().nonempty(errorMessages.required),
	firstName: z.string().nonempty(errorMessages.required),
	lastName: z.string().nonempty(errorMessages.required),
	phoneNumber: z.string().nonempty(errorMessages.required),
});

export const userAccountingEditSchema = z.object({
	email: z.string().nonempty(errorMessages.required),
	mailingAddress: z.string().nonempty(errorMessages.required),
	firstName: z.string().nonempty(errorMessages.required),
	lastName: z.string().nonempty(errorMessages.required),
	phoneNumber: z.string().nonempty(errorMessages.required),
	company: z.string().nonempty(errorMessages.required),
});

export const userInvestorEditSchema = z.object({
	email: z.string().nonempty(errorMessages.required),
	mailingAddress: z.string().nonempty(errorMessages.required),
	firstName: z.string().nonempty(errorMessages.required),
	lastName: z.string().nonempty(errorMessages.required),
	phoneNumber: z.string().nonempty(errorMessages.required),
	ssnEin: z.string().nonempty(errorMessages.required),
	entityName: z.string().nonempty(errorMessages.required),
	zip: z.string().nonempty(errorMessages.required),
	streetAddress: z.string().nonempty(errorMessages.required),
	accountNumber: z.string().nonempty(errorMessages.required),
	routingNumber: z.string().nonempty(errorMessages.required),
	accountType: z.string().nonempty(errorMessages.required),
	bankingName: z.string().nonempty(errorMessages.required),
});
