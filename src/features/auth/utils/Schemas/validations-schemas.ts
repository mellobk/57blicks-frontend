import * as z from "zod";
import registerFields from "../input-fields";

export const registerSchema = z.object({
	[registerFields?.password]: z
		.string()
		.min(10, { message: "" })
		.regex(new RegExp(".*[A-Z].*"), {
			message: "",
		})
		.regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!#?@\]]).{10,}$/), {
			message: "",
		}),
	[registerFields?.email]: z.string().min(1, { message: "required" }),
	[registerFields?.firstName]: z.string().min(1, { message: "required" }),
	[registerFields?.lastName]: z.string().min(1, { message: "required" }),
});
