import { type FC, useEffect } from "react";
import {
	Control,
	FieldErrors,
	UseFormRegister,
	UseFormSetValue,
	useWatch,
} from "react-hook-form";
import { Dropdown } from "@/components/forms/Dropdown";
import { FormatInput } from "@/components/forms/FormatInput";
import { Input } from "@/components/forms/Input";
import { MaskInput } from "@/components/forms/MaskInput";
import { Title } from "@/components/ui/Title/Title";
import { Loan } from "@/features/create-loan/types/fields";
import {
	ASSET_TYPES,
	LEAD_SOURCES,
	LOAN_TYPES,
} from "@/features/create-loan/utils/selects";

interface Props {
	control: Control<Loan>;
	errors: FieldErrors<Loan>;
	register: UseFormRegister<Loan>;
	setValue: UseFormSetValue<Loan>;
}

export const LoanInformation: FC<Props> = ({
	control,
	errors,
	register,
	setValue,
}) => {
	const [totalLoanAmount, constructionHoldback] = useWatch({
		control,
		name: ["totalLoanAmount", "constructionHoldback"],
	});

	useEffect(() => {
		setValue(
			"amountDrawn",
			String(
				(Number(totalLoanAmount) - Number(constructionHoldback) || 0).toFixed(2)
			)
		);
	}, [totalLoanAmount, constructionHoldback]);

	return (
		<div>
			<Title text="Loan Information" />
			<Dropdown
				control={control}
				error={errors?.type?.message}
				className="mt-6"
				label="Loan Type"
				name="type"
				options={LOAN_TYPES}
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
			<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6">
				<FormatInput
					control={control}
					error={errors?.totalLoanAmount?.message}
					format="money"
					label="Total Loan Amount"
					name="totalLoanAmount"
					wrapperClassName="mt-6"
					required
				/>
				<FormatInput
					control={control}
					error={errors?.interestRate?.message}
					format="percentage"
					label="Interest Rate"
					name="interestRate"
					wrapperClassName="mt-6"
					required
				/>
			</div>
			<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6">
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
			<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6">
				<FormatInput
					control={control}
					error={errors?.constructionHoldback?.message}
					format="money"
					label="Construction Holdback"
					name="constructionHoldback"
					wrapperClassName="mt-6"
					required
				/>
				<FormatInput
					control={control}
					error={errors?.amountDrawn?.message}
					format="money"
					label="Amount Drawn"
					name="amountDrawn"
					wrapperClassName="mt-6"
					disabled
					required
				/>
			</div>
			<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6">
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
			<Dropdown
				control={control}
				error={errors?.collaterals?.[0]?.assetType?.message}
				className="mt-6"
				label="Asset Type"
				name="collaterals.0.assetType"
				options={ASSET_TYPES}
				required
			/>
			<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6">
				<Input
					error={errors?.loanConsultant?.message}
					label="Loan Consultant"
					placeholder="Enter Loan Consultant"
					register={register("loanConsultant")}
					wrapperClassName="mt-6"
					required
				/>
				<FormatInput
					control={control}
					error={errors?.ltv?.message}
					format="percentage"
					label="LTV"
					name="ltv"
					wrapperClassName="mt-6"
					required
				/>
			</div>
			<Dropdown
				control={control}
				error={errors?.leadSource?.message}
				className="mt-6"
				label="Lead Origin"
				name="leadSource"
				options={LEAD_SOURCES}
				required
			/>
		</div>
	);
};
