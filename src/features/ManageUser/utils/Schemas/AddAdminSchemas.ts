import * as z from "zod";
import { addAdminFields } from "../input-fields";

export const AddAdminSchema = z.object({
	[addAdminFields?.firstName]: z.string().min(1, { message: "Required field" }),
	[addAdminFields?.lastName]: z.string().min(1, { message: "Required field" }),
	[addAdminFields?.mailingAddress]: z
		.string()
		.min(1, { message: "Required field" }),
	[addAdminFields?.email]: z
		.string()
		.email()
		.min(1, { message: "Required field" }),
	[addAdminFields?.phoneNumber]: z
		.string()
		.min(1, { message: "Required field" }),
});
