import { Cell } from "@/components/table/Cell";
import { useState, type ComponentType, useEffect } from "react";
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
	setValidApprove?: (validApprove: boolean) => void;
}

export const Footer: ComponentType<Props> = ({
	disabled,
	totals,
	control,
	setValue,
	setValidApprove,
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

	const getErrors = (): {
		amount: string;
		prorated: string;
		regular: string;
		constructionHoldback: string;
	} => {
		const error = {
			amount: "",
			prorated: "",
			regular: "",
			constructionHoldback: "",
		};

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
			error.prorated = "ERROR";
		}

		const regular = calculateRegular(
			String(totalLoanAmount),
			String(interestRate)
		);
		setValue("regular", String(round(totals.regular, 4)));
		if (round(Number(totals.regular), 2) !== round(Number(regular), 2)) {
			error.regular = "ERROR";
		}

		if (totals.amount !== Number(totalLoanAmount)) {
			error.amount = "ERROR";
		}

		if (totals.constructionHoldback !== Number(constructionHoldback)) {
			error.constructionHoldback = "ERROR";
		}

		if (
			error.amount ||
			error.prorated ||
			error.regular ||
			error.constructionHoldback
		) {
			setValidApprove && setValidApprove(false);
		} else {
			setValidApprove && setValidApprove(true);
		}

		return error;
	};

	return (
		<div className="flex flex-row h-10 bg-gray-200 rounded-b-2xl">
			<div className="grid grid-cols-6 w-full items-center">
				<Cell format="text" value="Total" bold />
				<Cell
					className={"text-primary-300"}
					format="money"
					value={totals.amount}
					bold
					error={getErrors().amount}
				/>
				<Cell format="text" value="--" bold />
				<Cell
					format="money"
					value={totals.prorated}
					bold
					error={getErrors().prorated}
				/>
				<Cell
					format="money"
					value={totals.regular}
					bold
					error={getErrors().regular}
				/>
				<Cell
					format="money"
					value={totals.constructionHoldback}
					bold
					error={getErrors().constructionHoldback}
				/>
			</div>
			<div className="w-12" />
		</div>
	);
};
