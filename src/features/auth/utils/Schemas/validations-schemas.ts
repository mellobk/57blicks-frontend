import * as z from "zod";
import createPassWordFields from "../input-fields.ts";

export const createPasswordSchema = z.object({
	[createPassWordFields?.password]: z
		.string()
		.min(8, { message: "" })
		.regex(new RegExp(".*[A-Z].*"), {
			message: "",
		})
		.regex(new RegExp(`.*[!@#$%^&*()\\-_=+[\\]{}|;:'",.<>/?].*`), {
			message: "",
		}),
});
