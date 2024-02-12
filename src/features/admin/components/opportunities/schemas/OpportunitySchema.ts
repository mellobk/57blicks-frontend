import * as z from "zod";
import { InvestorsNotificationSchema } from "@/features/admin/components/opportunities/schemas/InvestorNotificationSchema";
import { errorMessages } from "@/utils/error-messages";

export const OpportunitySchema = z.object({
	additionalInformation: z
		.string()
		.nonempty(errorMessages.required)
		.max(2000, errorMessages.maxLength),
	assetValue: z
		.string()
		.nonempty(errorMessages.required)
		.max(15, errorMessages.maxLength),
	dkcRepeatBorrower: z.string().nonempty(errorMessages.required),
	documentS3Path: z.string().optional(),
	googleDriveLink: z
		.string()
		.nonempty(errorMessages.required)
		.max(255, errorMessages.maxLength)
		.url(),
	image: z
		.any()
		.refine((files) => files?.length == 1, errorMessages.required)
		.refine(
			(files) =>
				["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
					files?.[0]?.type
				),
			".jpg, .jpeg, .png and .webp files are accepted."
		),
	investmentBorrower: z
		.string()
		.nonempty(errorMessages.required)
		.max(75, errorMessages.maxLength),
	investmentCollateral: z
		.string()
		.nonempty(errorMessages.required)
		.max(75, errorMessages.maxLength),
	investmentMonthlyInterestedOfferedToInvestor: z
		.string()
		.nonempty(errorMessages.required)
		.max(5, errorMessages.maxLength),
	investmentPermanentPenalty: z
		.string()
		.nonempty(errorMessages.required)
		.max(50, errorMessages.maxLength),
	investmentSummary: z
		.string()
		.nonempty(errorMessages.required)
		.max(2000, errorMessages.maxLength),
	investorsNotifications: z.array(InvestorsNotificationSchema).optional(),
	loanAmount: z
		.string()
		.nonempty(errorMessages.required)
		.max(15, errorMessages.maxLength),
	loanTerm: z
		.string()
		.nonempty(errorMessages.required)
		.max(50, errorMessages.maxLength),
	loanToValue: z.string().nonempty(errorMessages.required),
	loanType: z.string().nonempty(errorMessages.required),
	participantOpportunities: z.object({
		"99%": z.string().optional(),
		"75%": z.string().optional(),
		"50%": z.string().optional(),
	}),
	postTitle: z.string().max(50, errorMessages.maxLength),
});
