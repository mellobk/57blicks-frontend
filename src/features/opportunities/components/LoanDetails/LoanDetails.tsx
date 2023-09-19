import type { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { Title } from "@/components/ui/Title/Title";
import { Opportunity } from "@/features/opportunities/types/fields";
import { Select } from "@/components/forms/Select";
import { types } from "@/features/create-loan/utils/selects.ts";

interface Props {
	errors: FieldErrors<Opportunity>;
	register: UseFormRegister<Opportunity>;
}

export const LoanDetails: FC<Props> = ({ errors, register }) => (
	<div>
		<Title text="Loan Details" />
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6 items-end">
			<Input
				error={errors?.assetValue?.message}
				label="Asset Value"
				placeholder="Enter Asset Value"
				register={register("assetValue")}
				type="number"
				wrapperClassName="mt-6"
				required
			/>
			<Input
				error={errors?.loanAmount?.message}
				label="Loan Amount"
				placeholder="Enter Loan Amount"
				register={register("loanAmount")}
				type="number"
				wrapperClassName="mt-6"
				required
			/>
		</div>
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6  items-end">
			<Input
				error={errors?.loanToValue?.message}
				label="Loan to Value"
				placeholder="Enter Loan to Value"
				register={register("loanToValue")}
				type="number"
				wrapperClassName="mt-6"
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
		<Select
			className="mt-6"
			error={errors?.loanType?.message}
			label="Loan Type"
			options={types}
			placeholder="Select Loan Type"
			register={register("loanType")}
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
		<Input
			error={errors?.investmentMonthlyInterestedOfferedToParticipant?.message}
			label="Investment Monthly Interested Offered to Participant"
			placeholder="Enter Investment Monthly Interested Offered to Participant"
			register={register("investmentMonthlyInterestedOfferedToParticipant")}
      type="number"
			wrapperClassName="mt-6"
			required
		/>
	</div>
);
