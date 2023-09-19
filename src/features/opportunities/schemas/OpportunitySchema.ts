import * as z from "zod";
import { errorMessages } from "@/utils/error-messages";

export const LoanSchema = z.object({
	additionalInformation: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(2000, { message: errorMessages.maxLength }),
	assetValue: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(12, { message: errorMessages.maxLength }),
	dkcRepeatBorrower: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(50, { message: errorMessages.maxLength }),
	googleDriveLink: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(50, { message: errorMessages.maxLength }),
	investmentBorrower: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(50, { message: errorMessages.maxLength }),
	investmentBorrowerBackground: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(50, { message: errorMessages.maxLength }),
	investmentCollateral: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(50, { message: errorMessages.maxLength }),
	investmentMonthlyInterestedOfferedToParticipant: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(4, { message: errorMessages.maxLength }),
	investmentPermanentPenalty: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(50, { message: errorMessages.maxLength }),
	investmentSummary: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(2000, { message: errorMessages.maxLength }),
	loanAmount: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(12, { message: errorMessages.maxLength }),
	loanTerm: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(25, { message: errorMessages.maxLength }),
	loanToValue: z
		.string()
		.min(1, { message: errorMessages.required })
		.max(4, { message: errorMessages.maxLength }),
	loanType: z.string().min(1, { message: errorMessages.required }),
	participantOpportunities: z.array(z.string()),
	postTitle: z.string().max(50, { message: errorMessages.maxLength }),
});
