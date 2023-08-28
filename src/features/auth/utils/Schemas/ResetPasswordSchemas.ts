import * as z from "zod";
import { loginFields } from "../input-fields";

export const ResetPasswordSchemas = z.object({
	[loginFields?.email]: z
		.string()
		.email()
		.min(1, { message: "Required field" }),
});
