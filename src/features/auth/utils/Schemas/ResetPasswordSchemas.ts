import * as z from "zod";
import { errorMessages } from "@/utils/error-messages";
import { loginFields } from "../input-fields";

export const ResetPasswordSchemas = z.object({
	[loginFields?.email]: z.string().email().nonempty(errorMessages.required),
});
