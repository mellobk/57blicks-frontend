import type { FC } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { FormatInput } from "@/components/forms/FormatInput";
import { Input } from "@/components/forms/Input";
import { MaskInput } from "@/components/forms/MaskInput";
import { Select } from "@/components/forms/Select";
import { Title } from "@/components/ui/Title/Title";
import { Loan } from "@/features/create-loan/types/fields";
import { assetTypes, types } from "@/features/create-loan/utils/selects";

interface Props {
	control: Control<Loan>;
	errors: FieldErrors<Loan>;
	register: UseFormRegister<Loan>;
}

export const LoanInformation: FC<Props> = ({ control, errors, register }) => (
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
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6 items-end">
			<FormatInput
				control={control}
				error={errors?.totalLoanAmount?.message}
				format="money"
				label="Total Loan Amount"
				name="totalLoanAmount"
				placeholder="$0.00"
				wrapperClassName="mt-6"
				required
			/>
			<FormatInput
				control={control}
				error={errors?.interestRate?.message}
				format="percentage"
				label="Interest Rate"
				name="interestRate"
				placeholder="0%"
				wrapperClassName="mt-6"
				required
			/>
		</div>
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6 items-end">
			<MaskInput
				error={errors?.originationDate?.message}
				label="Origination Date"
				mask="99-99-9999"
				placeholder="MM-DD-YYYY"
				register={register("originationDate")}
				wrapperClassName="mt-6"
				required
			/>
			<MaskInput
				error={errors?.maturityDate?.message}
				label="Maturity Date"
				mask="99-99-9999"
				placeholder="MM-DD-YYYY"
				register={register("maturityDate")}
				wrapperClassName="mt-6"
				required
			/>
		</div>
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6 items-end">
			<FormatInput
				control={control}
				error={errors?.constructionHoldback?.message}
				format="money"
				label="Construction Holdback"
				name="constructionHoldback"
				placeholder="$0.00"
				wrapperClassName="mt-6"
				required
			/>
			<FormatInput
				control={control}
				error={errors?.amountDrawn?.message}
				format="money"
				label="Amount Drawn"
				name="amountDrawn"
				placeholder="$0.00"
				wrapperClassName="mt-6"
				required
			/>
		</div>
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6 items-end">
			<MaskInput
				error={errors?.collaterals?.[0]?.insuranceExpirationDate?.message}
				label="Insurance Expiration Date"
				mask="99-99-9999"
				placeholder="MM-DD-YYYY"
				register={register("collaterals.0.insuranceExpirationDate")}
				wrapperClassName="mt-6"
				required
			/>
			<Input
				error={errors?.prepaymentPenalty?.message}
				label="Prepayment Penalty"
				placeholder="0%, (90 Days)"
				register={register("prepaymentPenalty")}
				wrapperClassName="mt-6"
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
