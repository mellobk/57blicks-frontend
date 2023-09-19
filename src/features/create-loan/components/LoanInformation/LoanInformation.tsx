import type { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Title } from "@/components/ui/Title/Title";
import { Loan } from "@/features/create-loan/types/fields";
import {
	assetTypes,
	prepaymentPenalties,
	types,
} from "@/features/create-loan/utils/selects";

interface Props {
	errors: FieldErrors<Loan>;
	register: UseFormRegister<Loan>;
}

export const LoanInformation: FC<Props> = ({ errors, register }) => (
	<div>
		<Title text="Loan Information" />
		<Select
			className="mt-6"
			error={errors?.type?.message}
			label="Loan Type"
			options={types}
			placeholder="Select Loan Type"
			register={register("type")}
			required
		/>
		<Input
			error={errors?.collaterals?.[0]?.address?.message}
			label="Collateral Address"
			placeholder="Enter Collateral Address"
			register={register("collaterals.0.address")}
			wrapperClassName="mt-6"
			required
		/>
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6  items-end">
			<Input
				error={errors?.totalLoanAmount?.message}
				label="Total Loan Amount"
				placeholder="$0.00"
				register={register("totalLoanAmount")}
				type="number"
				wrapperClassName="mt-6"
				required
			/>
			<Input
				error={errors?.interestRate?.message}
				label="Interest Rate"
				placeholder="0%"
				register={register("interestRate")}
				type="number"
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
				type="number"
				wrapperClassName="mt-6"
				required
			/>
			<Input
				error={errors?.amountDrawn?.message}
				label="Amount Drawn"
				placeholder="$0.00"
				register={register("amountDrawn")}
				type="number"
				wrapperClassName="mt-6"
				required
			/>
		</div>
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6  items-end">
			<Input
				error={errors?.collaterals?.[0]?.insuranceExpirationDate?.message}
				label="Insurance Expiration Date"
				placeholder="MM-DD-YYYY"
				register={register("collaterals.0.insuranceExpirationDate")}
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
			error={errors?.collaterals?.[0]?.taxUrl?.message}
			label="Tax Property URL"
			placeholder="Enter Tax Property URL"
			register={register("collaterals.0.taxUrl")}
			wrapperClassName="mt-6"
			required
		/>
		<Input
			error={errors?.collaterals?.[0]?.link?.message}
			label="Collateral Link (Google Drive)"
			placeholder="Enter Collateral Link"
			register={register("collaterals.0.link")}
			wrapperClassName="mt-6"
			required
		/>
		<Select
			error={errors?.collaterals?.[0]?.assetType?.message}
			className="mt-6"
			label="Asset Type"
			options={assetTypes}
			placeholder="Enter Asset Type"
			register={register("collaterals.0.assetType")}
			required
		/>
	</div>
);
