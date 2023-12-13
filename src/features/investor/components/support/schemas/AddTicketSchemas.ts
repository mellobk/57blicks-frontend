import * as z from "zod";
import { errorMessages } from "@/utils/error-messages";

export const AddTicketSchema = z.object({
	title: z.string().nonempty(errorMessages.required),
	description: z.string().nonempty(errorMessages.required),
	category: z.string().nonempty(errorMessages.required),
});
