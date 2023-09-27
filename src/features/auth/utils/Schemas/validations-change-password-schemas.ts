import * as z from "zod";
import { changePassWordFields } from "../input-fields";

export const changePasswordSchema = z.object({
	[changePassWordFields?.newPassword]: z
		.string()
		.min(8, { message: "" })
		.regex(new RegExp(".*[A-Z].*"), {
			message: "",
		})
		.regex(new RegExp(`.*[!@#$%^&*()\\-_=+[\\]{}|;:'",.<>/?].*`), {
			message: "",
		}),
	[changePassWordFields?.oldPassword]: z
		.string()
		.min(8, { message: "Required field" }),
});
