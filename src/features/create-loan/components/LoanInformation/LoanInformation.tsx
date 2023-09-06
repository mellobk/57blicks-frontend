import type { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Title } from "@/features/create-loan/components/Title/Title";
import { LoanFields } from "@/features/create-loan/types/fields";
import {
	assetTypes,
	loanTypes,
	prepaymentPenalties,
} from "@/features/create-loan/utils/selects";

interface Props {
	errors: FieldErrors<LoanFields>;
	register: UseFormRegister<LoanFields>;
}

export const LoanInformation: FC<Props> = ({ errors, register }) => (
	<div>
		<Title text="Loan Information" />
		<Select
			className="mt-6"
			error={errors?.loanType?.message}
			label="Loan Type"
			options={loanTypes}
			placeholder="Select Loan Type"
			register={register("loanType", { required: true })}
			required
		/>
		<Input
			error={errors?.collateralAddress?.message}
			label="Collateral Address"
			placeholder="Enter Collateral Address"
			register={register("collateralAddress", { required: true, minLength:{ value: 5, message: "okokoko"} })}
			wrapperClassName="mt-6"
			required
		/>
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6  items-end">
			<Input
				error={errors?.totalLoanAmount?.message}
				label="Total Loan Amount"
				placeholder="$0.00"
				register={register("totalLoanAmount")}
				wrapperClassName="mt-6"
				required
			/>
			<Input
				error={errors?.interestRate?.message}
				label="Interest Rate"
				placeholder="0%"
				register={register("interestRate")}
				wrapperClassName="mt-6"
				required
			/>
		</div>
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6  items-end">
			<Input
				error={errors?.originationDate?.message}
				label="Origination Date"
				placeholder="MM-DD-YYYY"
				register={register("originationDate")}
				wrapperClassName="mt-6"
				required
			/>
			<Input
				error={errors?.maturityDate?.message}
				label="Maturity Date"
				placeholder="MM-DD-YYYY"
				register={register("maturityDate")}
				wrapperClassName="mt-6"
				required
			/>
		</div>
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6  items-end">
			<Input
				error={errors?.constructionHoldback?.message}
				label="Construction Holdback"
				placeholder="$0.00"
				register={register("constructionHoldback")}
				wrapperClassName="mt-6"
				required
			/>
			<Input
				error={errors?.amountDrawn?.message}
				label="Amount Drawn"
				placeholder="$0.00"
				register={register("amountDrawn")}
				wrapperClassName="mt-6"
				required
			/>
		</div>
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6  items-end">
			<Input
				error={errors?.insuranceExpirationDate?.message}
				label="Insurance Expiration Date"
				placeholder="MM-DD-YYYY"
				register={register("insuranceExpirationDate")}
				wrapperClassName="mt-6"
				required
			/>
			<Select
				className="mt-6"
				error={errors?.prepaymentPenalty?.message}
				label="Prepayment Penalty"
				options={prepaymentPenalties}
				placeholder="0%, (90 Days)"
				register={register("prepaymentPenalty")}
				required
			/>
		</div>
		<Input
			error={errors?.taxUrl?.message}
			label="Tax Property URL"
			placeholder="Enter Tax Property URL"
			register={register("taxUrl")}
			wrapperClassName="mt-6"
			required
		/>
		<Input
			error={errors?.collateralLink?.message}
			label="Collateral Link (Google Drive)"
			placeholder="Enter Collateral Link"
			register={register("collateralLink")}
			wrapperClassName="mt-6"
			required
		/>
		<Select
			error={errors?.assetType?.message}
			className="mt-6"
			label="Asset Type"
			options={assetTypes}
			placeholder="Enter Asset Type"
			register={register("assetType")}
			required
		/>
	</div>
);
