import * as z from "zod";

import { errorMessages } from "@/utils/error-messages";

export const CollateralSchema = z.object({
	address: z
		.string()
		.nonempty(errorMessages.required)
		.max(100, errorMessages.maxLength),
	assetType: z.string().nonempty(errorMessages.required),
	insuranceExpirationDate: z.string().nonempty(errorMessages.required),
	link: z
		.string()
		.nonempty(errorMessages.required)
		.max(1000, errorMessages.maxLength)
		.url(),
	taxUrl: z
		.string()
		.nonempty(errorMessages.required)
		.max(1000, errorMessages.maxLength)
		.url(),
});
