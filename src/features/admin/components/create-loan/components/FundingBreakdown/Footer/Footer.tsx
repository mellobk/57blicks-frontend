import { Cell } from "@/components/table/Cell";
import type { ComponentType } from "react";
import { type Control, useWatch, type UseFormSetValue } from "react-hook-form";
import type { Loan } from "@/features/admin/components/create-loan/types/fields";
import {
	calculateProrated,
	calculateRegular,
	round,
} from "@/utils/common-functions";
interface Props {
	disabled: boolean;
	totals: {
		amount: number;
		constructionHoldback: number;
		prorated: number;
		rate: number;
		regular: number;
	};
	control: Control<Loan>;
	setValue: UseFormSetValue<Loan>;
}

export const Footer: ComponentType<Props> = ({
	disabled,
	totals,
	control,
	setValue,
}) => {
	const [constructionHoldback, interestRate, originationDate, totalLoanAmount] =
		useWatch({
			control,
			name: [
				"constructionHoldback",
				"interestRate",
				"originationDate",
				"totalLoanAmount",
			],
		});

	const getErrorProrated = (): string => {
		const prorated = calculateProrated(
			String(totalLoanAmount),
			String(interestRate),
			String(originationDate)
		);
		setValue("prorated", String(totals.prorated));
		setValue("current", String(totals.prorated));
		setValue("principal", String(totalLoanAmount));
		setValue("balance", String(totalLoanAmount));
		if (round(totals.prorated, 2) !== round(Number(prorated), 2)) {
			return "ERROR";
		}
		return "";
	};

	const getRegular = (): string => {
		const regular = calculateRegular(
			String(totalLoanAmount),
			String(interestRate)
		);
		setValue("regular", String(round(totals.regular, 4)));
		if (round(Number(totals.regular), 2) !== round(Number(regular), 2)) {
			return "ERROR";
		}

		return "";
	};

	const getConstructionHoldback = (): string => {
		if (totals.constructionHoldback !== Number(constructionHoldback)) {
			return "ERROR";
		}
		return "";
	};

	return (
		<div className="flex flex-row h-10 bg-gray-200 rounded-b-2xl">
			<div className="grid grid-cols-6 w-full items-center">
				<Cell format="text" value="Total" bold />
				<Cell
					className={disabled ? "text-red-ERROR" : "text-primary-300"}
					format="money"
					value={totals.amount}
					bold
				/>
				<Cell format="text" value="--" bold />
				<Cell
					format="money"
					value={totals.prorated}
					bold
					error={getErrorProrated()}
				/>
				<Cell format="money" value={totals.regular} bold error={getRegular()} />
				<Cell
					format="money"
					value={totals.constructionHoldback}
					bold
					error={getConstructionHoldback()}
				/>
			</div>
			<div className="w-12" />
		</div>
	);
};
