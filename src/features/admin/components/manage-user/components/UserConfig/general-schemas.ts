import * as z from "zod";

import { errorMessages } from "@/utils/error-messages";

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
	companyName: z.string().nonempty(errorMessages.required),
});

export const userInvestorEditSchema = z.object({
	email: z.string().nonempty(errorMessages.required),
	mailingAddress: z.string().nonempty(errorMessages.required),
	firstName: z.string().nonempty(errorMessages.required),
	lastName: z.string().nonempty(errorMessages.required),
	phoneNumber: z.string().nonempty(errorMessages.required),
	ssnEin: z.string(),
	entityName: z.string(),
	zip: z.string(),
	accountNumber: z.string(),
	routingNumber: z.string(),
	accountType: z.string().optional(),
	bankingName: z.string(),
});
