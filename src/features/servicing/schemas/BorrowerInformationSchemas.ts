/* import * as z from "zod";
import { borrowerInformationFields } from "../utils/input-fields";

export const BorrowerInformationSchema = z.object({
	[borrowerInformationFields?.firstName]: z
		.string()
		.nonempty(errorMessages.required),
	[borrowerInformationFields?.lastName]: z
		.string()
		.nonempty(errorMessages.required),
	[borrowerInformationFields?.mailingAddress]: z
		.string()
		.nonempty(errorMessages.required),
	[borrowerInformationFields?.email]: z
		.string()
		.email()
		.nonempty(errorMessages.required),
	[borrowerInformationFields?.phoneNumber]: z
		.string()
		.nonempty(errorMessages.required),
	[borrowerInformationFields?.llc]: z.string(),
	[borrowerInformationFields?.ssnEin]: z
		.string()
		.nonempty(errorMessages.required),
	[borrowerInformationFields?.bankingName]: z.string().optional(),
	[borrowerInformationFields?.accountNumber]: z.string().optional(),
	[borrowerInformationFields?.accountType]: z.string().optional(),
	[borrowerInformationFields?.routingNumber]: z.string().optional(),
});
 */
