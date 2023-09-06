import * as z from "zod";
import { errorMessages } from "@/utils/error-messages.tsx";

export const LoanSchema = z.object({
	accountNumber: z.number(),
	accountType: z.string(),
	amountDrawn: z
		.number()
		.min(0, { message: errorMessages.required })
		.max(999999999999.99, { message: errorMessages.maxLength }),
	assetType: z.string().min(1, { message: errorMessages.required }),
	bankingName: z.string(),
	borrowerEmailAddress: z
		.string()
		.email(errorMessages.email)
		.min(1, { message: errorMessages.required })
		.max(30, { message: errorMessages.maxLength }),
	borrowerLlc: z.string().min(1, { message: errorMessages.required }),
	borrowerPhoneNumber: z
		.number()
		.min(1000000000, { message: errorMessages.required })
		.max(99999999999, { message: errorMessages.maxLength }),
	"collaterals.assetType": z
		.string()
		.min(1, { message: errorMessages.required }),
	"collaterals.collateralAddress": z
		.string()
		.min(1, { message: errorMessages.required })
		.max(100, { message: errorMessages.maxLength }),
	"collaterals.insuranceExpirationDate": z.date(),
	"collaterals.taxUrl": z
		.string()
		.min(1, { message: errorMessages.required })
		.max(100, { message: errorMessages.maxLength }),
	collateralAddress: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(100, { message: errorMessages.maxLength }),
	collateralLink: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(100, { message: errorMessages.maxLength }),
	constructionHoldback: z
		.number()
		.min(0, { message: errorMessages.required })
		.max(999999999999.99, { message: errorMessages.maxLength }),
	einSsn: z
		.number()
		.min(100000000, { message: errorMessages.required })
		.max(999999999, { message: errorMessages.maxLength }),
	firstName: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(25, { message: errorMessages.maxLength }),
	insuranceExpirationDate: z
		.string()
		.min(1, { message: errorMessages.required }),
	interestRate: z
		.number()
		.min(0, { message: errorMessages.required })
		.max(100, { message: errorMessages.maxLength }),
	lastName: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(25, { message: errorMessages.maxLength }),
	loanType: z.string().min(1, { message: errorMessages.required }),
	mailingAddress: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(100, { message: errorMessages.maxLength }),
	maturityDate: z.date(),
	originationDate: z.date(),
	prepaymentPenalty: z
		.number()
		.min(0, { message: errorMessages.required })
		.max(999999999999.99, { message: errorMessages.maxLength }),
	routingNumber: z.string(),
	taxUrl: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(100, { message: errorMessages.maxLength }),
	totalLoanAmount: z
		.number()
		.min(1, { message: errorMessages.required })
		.max(999999999999.99, { message: errorMessages.maxLength }),
});
