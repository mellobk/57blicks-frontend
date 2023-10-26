import * as z from "zod";

import { ApprovalStateType, LedgerType, LedgerTypeOfPayment } from "../types";

import { errorMessages } from "@/utils/error-messages";

export const validationSchema = z.object({
	ledgers: z.array(
		z.object({
			id: z.string(),
			ledgerDate: z.string(),
			typeOfPayment: z.nativeEnum(LedgerTypeOfPayment),
			typeOfPaymentDescription: z.string(),
			type: z.nativeEnum(LedgerType),
			memo: z.string(),
			debit: z.coerce.number().min(0, { message: errorMessages.required }),
			credit: z.coerce.number().min(0, { message: errorMessages.required }),
			balance: z.number().min(0, { message: errorMessages.required }),
			approvalState: z.nativeEnum(ApprovalStateType),
			editable: z.boolean(),
			order: z.number(),
			new: z.boolean(),
			action: z.string(),
		})
	),
});
