import * as z from "zod";

import { userEditFields } from "./input-fields";

export const userEditSchema = z.object({
	[userEditFields?.email]: z.string().min(1, { message: "Required field" }),
	[userEditFields?.mailingAddress]: z
		.string()
		.min(1, { message: "Required field" }),

	[userEditFields?.firstName]: z.string().min(1, { message: "Required field" }),
	[userEditFields?.lastName]: z.string().min(1, { message: "Required field" }),
	[userEditFields?.phoneNumber]: z
		.string()
		.min(1, { message: "Required field" }),
});
