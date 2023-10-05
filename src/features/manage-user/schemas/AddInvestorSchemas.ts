import * as z from "zod";
import { addInvestorFields } from "../utils/input-fields";

export const AddInvestorSchemas = z.object({
	[addInvestorFields?.firstName]: z
		.string()
		.min(1, { message: "Required field" }),
	[addInvestorFields?.lastName]: z
		.string()
		.min(1, { message: "Required field" }),
	[addInvestorFields?.email]: z
		.string()
		.email()
		.min(1, { message: "Required field" }),
	[addInvestorFields?.entityName || ""]: z.string().optional(),
	[addInvestorFields?.phoneNumber]: z
		.string()
		.min(1, { message: "Required field" }),
	[addInvestorFields?.einSsn || "einSsn"]: z.string(),
	[addInvestorFields?.zip || "zip"]: z.string(),
	[addInvestorFields?.mailingAddress || "streetAddress"]: z.string().optional(),
});
