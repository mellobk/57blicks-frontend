import * as z from "zod";
import { InvestorsNotificationSchema } from "@/features/opportunities/schemas/InvestorNotificationSchema";
import { errorMessages } from "@/utils/error-messages";

export const OpportunitySchema = z.object({
	additionalInformation: z
		.string()
		.nonempty(errorMessages.required)
		.max(2000, errorMessages.maxLength),
	assetValue: z
		.string()
		.nonempty(errorMessages.required)
		.max(12, errorMessages.maxLength),
	dkcRepeatBorrower: z
		.string()
		.nonempty(errorMessages.required)
		.max(50, errorMessages.maxLength),
	documentS3Path: z.string().optional(),
	googleDriveLink: z
		.string()
		.nonempty(errorMessages.required)
		.url()
		.max(50, errorMessages.maxLength),
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
		.max(50, errorMessages.maxLength),
	investmentBorrowerBackground: z
		.string()
		.nonempty(errorMessages.required)
		.max(50, errorMessages.maxLength),
	investmentCollateral: z
		.string()
		.nonempty(errorMessages.required)
		.max(50, errorMessages.maxLength),
	investmentMonthlyInterestedOfferedToParticipant: z
		.string()
		.nonempty(errorMessages.required)
		.max(4, errorMessages.maxLength),
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
		.max(12, errorMessages.maxLength),
	loanTerm: z
		.string()
		.nonempty(errorMessages.required)
		.max(25, errorMessages.maxLength),
	loanToValue: z.string().nonempty(errorMessages.required),
	loanType: z.string().nonempty(errorMessages.required),
	participantOpportunities: z.object({
		"99%": z.string(),
		"75%": z.string(),
		"50%": z.string(),
	}),
	postTitle: z.string().max(50, errorMessages.maxLength),
});
