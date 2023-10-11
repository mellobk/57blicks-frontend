import * as z from "zod";
import { errorMessages } from "@/utils/error-messages";
import { generalInformationFields } from "../input-fields";

export const generalInformationSchema = z.object({
	[generalInformationFields?.email]: z
		.string()
		.nonempty(errorMessages.required),
	[generalInformationFields?.companyName]: z.string(),
	[generalInformationFields?.firstName]: z
		.string()
		.nonempty(errorMessages.required),
	[generalInformationFields?.lastName]: z
		.string()
		.nonempty(errorMessages.required),
	[generalInformationFields?.phoneNumber]: z
		.string()
		.nonempty(errorMessages.required),
});
