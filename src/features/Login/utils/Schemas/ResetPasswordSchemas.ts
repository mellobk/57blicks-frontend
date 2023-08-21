// eslint-disable-next-line unicorn/filename-case
import * as z from "zod";
import { loginFields } from "../inputFields";

export const ResetPasswordSchemas = z.object({
	[loginFields?.email]: z
		.string()
		.email()
		.min(1, { message: "Required field" }),
});
