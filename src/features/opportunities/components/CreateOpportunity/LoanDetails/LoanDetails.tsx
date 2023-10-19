import type { FC } from "react";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Dropdown } from "@/components/forms/Dropdown";
import { Input } from "@/components/forms/Input";
import { Title } from "@/components/ui/Title";
import { LOAN_TYPES } from "@/features/create-loan/utils/selects";
import type { Opportunity } from "@/features/opportunities/types/fields";
import { FormatInput } from "@/components/forms/FormatInput";

interface Props {
	control: Control<Opportunity>;
	errors: FieldErrors<Opportunity>;
	register: UseFormRegister<Opportunity>;
}

export const LoanDetails: FC<Props> = ({ control, errors, register }) => (
	<div>
		<Title text="Loan Details" />
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6">
			<FormatInput
				control={control}
				error={errors?.assetValue?.message}
				format="money"
				label="Asset Value"
				name="assetValue"
				wrapperClassName="mt-6"
				required
			/>
			<FormatInput
				control={control}
				error={errors?.loanAmount?.message}
				format="money"
				label="Loan Amount"
				name="loanAmount"
				wrapperClassName="mt-6"
				required
			/>
		</div>
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6">
			<FormatInput
				control={control}
				error={errors?.loanToValue?.message}
				format="percentage"
				label="Loan to Value"
				name="loanToValue"
				wrapperClassName="mt-6"
				disabled
				required
			/>
			<Input
				error={errors?.loanTerm?.message}
				label="Loan Term"
				placeholder="Enter Loan Term"
				register={register("loanTerm")}
				wrapperClassName="mt-6"
				required
			/>
		</div>
		<Dropdown
			control={control}
			error={errors?.loanType?.message}
			className="mt-6"
			label="Loan Type"
			name="loanType"
			options={LOAN_TYPES}
			required
		/>
		<Input
			error={errors?.investmentPermanentPenalty?.message}
			label="Investment Permanent Penalty"
			placeholder="Enter Investment Permanent Penalty"
			register={register("investmentPermanentPenalty")}
			wrapperClassName="mt-6"
			required
		/>
		<FormatInput
			control={control}
			error={errors?.investmentMonthlyInterestedOfferedToInvestor?.message}
			format="percentage"
			label="Investment Monthly Interested Offered to Investor"
			name="investmentMonthlyInterestedOfferedToInvestor"
			wrapperClassName="mt-6"
			required
		/>
	</div>
);
