import {
	calculateProrated,
	calculateRegular,
	round,
} from "@/utils/common-functions";

import type { FundingBreakdown as FundingBreakdownType } from "@/features/admin/components/create-loan/types/fields";

export const validateProratedRowsCalculations = (
	amount: string,
	rate: string,
	originationDate: string,
	type: string,
	totalLoanAmount: string,
	interestRate: string,
	fundingBreakdown: Array<FundingBreakdownType>
): string => {
	let currentProrated = Number(
		calculateProrated(amount, rate, originationDate)
	);

	if (type === "Servicing") {
		let proratedValues = 0;

		fundingBreakdown.forEach((item) => {
			proratedValues += round(
				Number(calculateProrated(item.amount, item.rate, originationDate)),
				2
			);
		});

		const loanAmountProrated = round(
			Number(calculateProrated(totalLoanAmount, interestRate, originationDate)),
			2
		);

		const difference = round(
			Number(loanAmountProrated) - Number(proratedValues),
			2
		);

		if (difference > 0) {
			currentProrated += difference;
		} else if (difference < 0) {
			currentProrated -= difference;
		}
	}

	return String(round(currentProrated, 2));
};

export const validateRegularRowsCalculations = (
	amount: string,
	rate: string,
	type: string,
	totalLoanAmount: string,
	interestRate: string,
	fundingBreakdown: Array<FundingBreakdownType>
): string => {
	let currentRegular = Number(calculateRegular(amount, rate));

	if (type === "Servicing") {
		let regularValues = 0;

		fundingBreakdown.forEach((item) => {
			regularValues += Number(calculateRegular(item.amount, item.rate));
		});

		const loanAmountRegular = Number(
			calculateRegular(totalLoanAmount, interestRate)
		);

		const difference = loanAmountRegular - regularValues;

		if (difference > 0) {
			currentRegular += difference;
		} else if (difference < 0) {
			currentRegular -= difference;
		}
	}

	return String(currentRegular);
};
