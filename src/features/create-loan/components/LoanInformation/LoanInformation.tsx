import type { FC } from "react";
import { UseFormRegister } from "react-hook-form";
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
	register: UseFormRegister<LoanFields>;
}

export const LoanInformation: FC<Props> = ({ register }) => (
	<div>
		<Title text="Loan Information" />
		<Select
			className="mt-6"
			label="Loan Type"
			options={loanTypes}
			placeholder="Select Loan Type"
			register={register("loanType")}
			required
		/>
		<Input
			label="Collateral Address"
			placeholder="Enter Collateral Address"
			register={register("collateralAddress")}
			wrapperClassName="mt-6"
			required
		/>
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6  items-end">
			<Input
				label="Total Loan Amount"
				placeholder="$0.00"
				register={register("totalLoanAmount")}
				wrapperClassName="mt-6"
				required
			/>
			<Input
				label="Interest Rate"
				placeholder="0%"
				register={register("interestRate")}
				wrapperClassName="mt-6"
				required
			/>
		</div>
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6  items-end">
			<Input
				label="Origination Date"
				placeholder="MM-DD-YYYY"
				register={register("originationDate")}
				wrapperClassName="mt-6"
				required
			/>
			<Input
				label="Maturity Date"
				placeholder="MM-DD-YYYY"
				register={register("maturityDate")}
				wrapperClassName="mt-6"
				required
			/>
		</div>
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6  items-end">
			<Input
				label="Construction Holdback"
				placeholder="$0.00"
				register={register("constructionHoldback")}
				wrapperClassName="mt-6"
				required
			/>
			<Input
				label="Amount Drawn"
				placeholder="$0.00"
				register={register("amountDrawn")}
				wrapperClassName="mt-6"
				required
			/>
		</div>
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6  items-end">
			<Input
				label="Insurance Expiration Date"
				placeholder="MM-DD-YYYY"
				register={register("insuranceExpirationDate")}
				wrapperClassName="mt-6"
				required
			/>
			<Select
				className="mt-6"
				label="Prepayment Penalty"
				options={prepaymentPenalties}
				placeholder="0%, (90 Days)"
				register={register("prepaymentPenalty")}
				required
			/>
		</div>
		<Input
			label="Tax Property URL"
			placeholder="Enter Tax Property URL"
			register={register("taxUrl")}
			wrapperClassName="mt-6"
			required
		/>
		<Input
			label="Collateral Link (Google Drive)"
			placeholder="Enter Collateral Link"
			register={register("collateralLink")}
			wrapperClassName="mt-6"
			required
		/>
		<Select
			className="mt-6"
			label="Asset Type"
			options={assetTypes}
			placeholder="Enter Asset Type"
			register={register("assetType")}
			required
		/>
	</div>
);
