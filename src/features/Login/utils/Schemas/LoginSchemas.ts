// eslint-disable-next-line unicorn/filename-case
import * as z from "zod";
import { loginFields } from "../inputFields";

export const LoginSchema = z.object({
	[loginFields?.email]: z
		.string()
		.email()
		.min(1, { message: "Required field" }),
	[loginFields?.password]: z.string().min(1, { message: "Required field" }),
});
