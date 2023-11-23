import type { FundingBreakdown } from "@/features/admin/components/create-loan/types/fields";

export const validateFunding = (
	fundingBreakdown: Array<FundingBreakdown>
): string => {
	let message = "";
	//validate all rates are filled
	fundingBreakdown.forEach((participant) => {
		if (!participant.rate) {
			message = "Please fill all rates";
		}
	});

	return message;
};
