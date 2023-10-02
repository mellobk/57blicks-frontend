/* import * as z from "zod";
import { borrowerInformationFields } from "../utils/input-fields";

export const BorrowerInformationSchema = z.object({
	[borrowerInformationFields?.firstName]: z
		.string()
		.min(1, { message: "Required field" }),
	[borrowerInformationFields?.lastName]: z
		.string()
		.min(1, { message: "Required field" }),
	[borrowerInformationFields?.mailingAddress]: z
		.string()
		.min(1, { message: "Required field" }),
	[borrowerInformationFields?.email]: z
		.string()
		.email()
		.min(1, { message: "Required field" }),
	[borrowerInformationFields?.phoneNumber]: z
		.string()
		.min(1, { message: "Required field" }),
	[borrowerInformationFields?.llc]: z.string(),
	[borrowerInformationFields?.ssnEin]: z
		.string()
		.min(1, { message: "Required field" }),
	[borrowerInformationFields?.bankingName]: z.string().optional(),
	[borrowerInformationFields?.accountNumber]: z.string().optional(),
	[borrowerInformationFields?.accountType]: z.string().optional(),
	[borrowerInformationFields?.routingNumber]: z.string().optional(),
});
 */
