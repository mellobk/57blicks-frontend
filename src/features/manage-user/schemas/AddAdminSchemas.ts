import * as z from "zod";
import { addAdminFields } from "../utils/input-fields";
import { errorMessages } from "@/utils/error-messages";

export const AddAdminSchema = z.object({
	[addAdminFields?.firstName]: z.string().nonempty(errorMessages.required),
	[addAdminFields?.lastName]: z.string().nonempty(errorMessages.required),
	[addAdminFields?.companyName || ""]: z.string().optional(),
	[addAdminFields?.mailingAddress]: z.string().nonempty(errorMessages.required),
	[addAdminFields?.email]: z.string().email().nonempty(errorMessages.required),
	[addAdminFields?.phoneNumber]: z.string().nonempty(errorMessages.required),
});
