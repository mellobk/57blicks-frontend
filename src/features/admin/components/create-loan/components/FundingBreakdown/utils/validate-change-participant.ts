import type { FundingBreakdown as FundingBreakdownType } from "@/features/admin/components/create-loan/types/fields";
export const validateChangeParticipant = (
	participationBreakdown: Array<FundingBreakdownType>,
	fundingBreakdown: Array<FundingBreakdownType>,
	interestRate: string,
	order?: "Investor" | "YieldSpread"
): Array<FundingBreakdownType> => {
	const investors: Array<{
		investorId: string;
		amount: string;
		rate: string;
	}> = [];
	participationBreakdown.forEach((participant) => {
		if (participant.investorId && participant.type === "Investor") {
			investors.push({
				investorId: participant.investorId,
				amount: participant.amount,
				rate: participant.rate,
			});
		}
	});
	const newParticipationBreakdown: Array<FundingBreakdownType> = [];
	participationBreakdown.forEach((participant) => {
		let push = true;
		investors.forEach((investor) => {
			if (
				participant.investorId === investor.investorId &&
				participant.type === "YieldSpread"
			) {
				const servicing = Number(fundingBreakdown?.[1]?.rate || "0");
				const rate = Number(investor.rate);
				const ysRate = Number(interestRate) - servicing - rate;
				interestRate;
				newParticipationBreakdown.push({
					...participant,
					amount: investor.amount,
					rate: String(ysRate),
				});
				push = false;
			}
		});
		if (push) {
			newParticipationBreakdown.push(participant);
		}
	});

	if (order === "YieldSpread") {
		//reorder array puting the type. YieldSpread at the end
		const yieldSpread = newParticipationBreakdown.filter(
			(participant) => participant.type === "YieldSpread"
		);
		const newParticipationBreakdownFiltered = newParticipationBreakdown.filter(
			(participant) => participant.type !== "YieldSpread"
		);

		yieldSpread ? newParticipationBreakdownFiltered.push(...yieldSpread) : null;
		return newParticipationBreakdownFiltered;
	}
	return newParticipationBreakdown;
};
