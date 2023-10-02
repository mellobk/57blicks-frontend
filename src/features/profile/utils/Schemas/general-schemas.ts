import * as z from "zod";
import { generalInformationFields } from "../input-fields";

export const generalInformationSchema = z.object({
	[generalInformationFields?.email]: z
		.string()
		.min(1, { message: "Required field" }),
	[generalInformationFields?.companyName]: z.string(),
	[generalInformationFields?.firstName]: z
		.string()
		.min(1, { message: "Required field" }),
	[generalInformationFields?.lastName]: z
		.string()
		.min(1, { message: "Required field" }),
	[generalInformationFields?.phoneNumber]: z
		.string()
		.min(1, { message: "Required field" }),
});
