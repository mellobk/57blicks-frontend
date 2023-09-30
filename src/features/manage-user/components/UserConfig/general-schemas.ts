import * as z from "zod";

export const userAdminEditSchema = z.object({
	email: z.string().min(1, { message: "Required field" }),
	mailingAddress: z.string().min(1, { message: "Required field" }),
	firstName: z.string().min(1, { message: "Required field" }),
	lastName: z.string().min(1, { message: "Required field" }),
	phoneNumber: z.string().min(1, { message: "Required field" }),
});

export const userAccountingEditSchema = z.object({
	email: z.string().min(1, { message: "Required field" }),
	mailingAddress: z.string().min(1, { message: "Required field" }),
	firstName: z.string().min(1, { message: "Required field" }),
	lastName: z.string().min(1, { message: "Required field" }),
	phoneNumber: z.string().min(1, { message: "Required field" }),
	company: z.string().min(1, { message: "Required field" }),
});

export const userInvestorEditSchema = z.object({
	email: z.string().min(1, { message: "Required field" }),
	mailingAddress: z.string().min(1, { message: "Required field" }),
	firstName: z.string().min(1, { message: "Required field" }),
	lastName: z.string().min(1, { message: "Required field" }),
	phoneNumber: z.string().min(1, { message: "Required field" }),
	ssnEin: z.string().min(1, { message: "Required field" }),
	entityName: z.string().min(1, { message: "Required field" }),
	zip: z.string().min(1, { message: "Required field" }),
	streetAddress: z.string().min(1, { message: "Required field" }),
	accountNumber: z.string().min(1, { message: "Required field" }),
	routingNumber: z.string().min(1, { message: "Required field" }),
	accountType: z.string().min(1, { message: "Required field" }),
	bankingName: z.string().min(1, { message: "Required field" }),
});
