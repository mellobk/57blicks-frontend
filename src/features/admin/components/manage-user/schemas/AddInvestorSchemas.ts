import * as z from "zod";
import { errorMessages } from "@/utils/error-messages.ts";
import { addInvestorFields } from "../utils/input-fields.ts";

export const AddInvestorSchemas = z.object({
	[addInvestorFields?.firstName]: z.string().nonempty(errorMessages.required),
	[addInvestorFields?.lastName]: z.string().nonempty(errorMessages.required),
	[addInvestorFields?.email]: z
		.string()
		.email()
		.nonempty(errorMessages.required),
	[addInvestorFields?.entityName || ""]: z.string().optional(),
	[addInvestorFields?.phoneNumber]: z.string().nonempty(errorMessages.required),
	[addInvestorFields?.einSsn || "einSsn"]: z.string(),
	[addInvestorFields?.zip || "zip"]: z.string(),
	[addInvestorFields?.mailingAddress || "streetAddress"]: z.string().optional(),
});
