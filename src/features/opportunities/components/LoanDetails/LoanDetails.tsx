import type { FC } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Dropdown } from "@/components/forms/Dropdown";
import { Input } from "@/components/forms/Input";
import { Title } from "@/components/ui/Title";
import { types } from "@/features/create-loan/utils/selects";
import { Opportunity } from "@/features/opportunities/types/fields";

interface Props {
	control: Control<Opportunity>;
	errors: FieldErrors<Opportunity>;
	register: UseFormRegister<Opportunity>;
}

export const LoanDetails: FC<Props> = ({ control, errors, register }) => (
	<div>
		<Title text="Loan Details" />
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6">
			<Input
				error={errors?.assetValue?.message}
				label="Asset Value"
				min={0}
				placeholder="Enter Asset Value"
				register={register("assetValue")}
				type="number"
				wrapperClassName="mt-6"
				required
			/>
			<Input
				error={errors?.loanAmount?.message}
				label="Loan Amount"
				min={0}
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
				min={0}
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
		<Dropdown
			control={control}
			error={errors?.loanType?.message}
			className="mt-6"
			label="Loan Type"
			name="loanType"
			options={types}
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
			min={0}
			placeholder="Enter Investment Monthly Interested Offered to Participant"
			register={register("investmentMonthlyInterestedOfferedToParticipant")}
			type="number"
			wrapperClassName="mt-6"
			required
		/>
	</div>
);
