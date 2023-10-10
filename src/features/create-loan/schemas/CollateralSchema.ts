import * as z from "zod";
import { errorMessages } from "@/utils/error-messages";

export const CollateralSchema = z.object({
	address: z
		.string()
    .nonempty(errorMessages.required)
		.max(100, { message: errorMessages.maxLength }),
	assetType: z.string().min(1, { message: errorMessages.required }),
	insuranceExpirationDate: z
		.string()
    .nonempty(errorMessages.required)
		.min(10, { message: errorMessages.minLength })
    .max(10, { message: errorMessages.maxLength }),
	link: z
		.string()
    .nonempty(errorMessages.required)
		.max(255, { message: errorMessages.maxLength })
    .url(),
	taxUrl: z
		.string()
    .nonempty(errorMessages.required)
		.max(255, { message: errorMessages.maxLength })
    .url(),
});
