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
		.min(1, { message: errorMessages.required }),
	link: z
		.string()
		.url()
		.nonempty({ message: errorMessages.required })
		.max(100, { message: errorMessages.maxLength }),
	taxUrl: z
		.string()
		.url()
		.nonempty({ message: errorMessages.required })
		.max(100, { message: errorMessages.maxLength }),
});
