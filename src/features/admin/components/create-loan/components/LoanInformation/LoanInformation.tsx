import { type FC, useEffect } from "react";
import {
	type Control,
	type FieldErrors,
	type UseFormRegister,
	type UseFormSetValue,
	useWatch,
} from "react-hook-form";
import { Dropdown } from "@/components/forms/Dropdown";
import { FormatInput } from "@/components/forms/FormatInput";
import { Input } from "@/components/forms/Input";
import { MaskInput } from "@/components/forms/MaskInput";
import { Title } from "@/components/ui/Title/Title";
import type { Loan } from "@/features/admin/components/create-loan/types/fields";
import {
	ASSET_TYPES,
	LEAD_SOURCES,
	LOAN_TYPES,
} from "@/features/admin/components/create-loan/utils/selects";
import moment from "moment";
import { inputClassName } from "@/utils/class-names";

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
        data-testid="loan-information-loan-type"
				control={control}
				error={errors?.type?.message}
				className="mt-6"
				label="Loan Type"
				name="type"
				options={LOAN_TYPES}
				required
			/>
			<Input
        data-testid="loan-information-collateral-address"
				error={errors?.collaterals?.[0]?.address?.message}
				label="Collateral Address"
				placeholder="Enter Collateral Address"
				register={register("collaterals.0.address")}
				wrapperClassName="mt-6"
				required
			/>
			<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6">
				<FormatInput
          data-testid="loan-information-loan-amount"
					control={control}
					error={errors?.totalLoanAmount?.message}
					format="money"
					label="Total Loan Amount"
					name="totalLoanAmount"
					wrapperClassName="mt-6"
					required
				/>
				<FormatInput
          data-testid="loan-information-interest-rate"
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
					data-testid="loan-information-origin-date"
					error={errors?.originationDate?.message}
					label="Origination Date"
					mask="99-99-9999"
					placeholder="MM-DD-YYYY"
					register={register("originationDate")}
					wrapperClassName="mt-6"
					required
					datePickerProps={{
						placeholder: "MM-DD-YYYY",
						// maxDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
						// minDate: new Date(),
						name: "originationDate",
						className:"[&>*]:placeholder-gray-400 [&>*]:bg-gray-200 [&>*]:border-gray-200 [&>*]:font-inter [&>*]:text-[13px] [&>*]:text-primary-500 [&>*]:leading-4",
						wrapperClassName: "mt-6" + inputClassName(errors?.originationDate?.message),
						onChange: (date: Date): void => {
						setValue("originationDate", moment(date).format("MMDDYYYY"), {
							shouldValidate: true,
							shouldDirty: true,
						});
						},
					}}
				/>
                <MaskInput
                    data-testid="loan-information-maturity-date"
                    error={errors?.maturityDate?.message}
                    label="Maturity Date"
                    mask="99-99-9999"
                    placeholder="MM-DD-YYYY"
                    register={register("maturityDate")}
                    wrapperClassName="mt-6"
                    required
					datePickerProps={{
						placeholder: "MM-DD-YYYY",
						// maxDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
						// minDate: new Date(),
						name: "originationDate",
						className:"[&>*]:placeholder-gray-400 [&>*]:bg-gray-200 [&>*]:border-gray-200 [&>*]:font-inter [&>*]:text-[13px] [&>*]:text-primary-500 [&>*]:leading-4",
						wrapperClassName: "mt-6" + inputClassName(errors?.originationDate?.message),
						onChange: (date: Date): void => {
						setValue("originationDate", moment(date).format("MMDDYYYY"), {
							shouldValidate: true,
							shouldDirty: true,
						});
						},
					}}
                />
            </div>
			<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6">
				<FormatInput
          data-testid="loan-information-construction-holdback"
					control={control}
					error={errors?.constructionHoldback?.message}
					format="money"
					label="Construction Holdback"
					name="constructionHoldback"
					wrapperClassName="mt-6"
					required
				/>
				<FormatInput
          data-testid="loan-information-amount-drawn"
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
          data-testid="loan-information-insurance-expiration-date"
					error={errors?.collaterals?.[0]?.insuranceExpirationDate?.message}
					label="Insurance Expiration Date"
					mask="99-99-9999"
					placeholder="MM-DD-YYYY"
					register={register("collaterals.0.insuranceExpirationDate")}
					wrapperClassName="mt-6"
					required
					datePickerProps={{
						placeholder: "MM-DD-YYYY",
						// maxDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
						// minDate: new Date(),
						name: "originationDate",
						className:"[&>*]:placeholder-gray-400 [&>*]:bg-gray-200 [&>*]:border-gray-200 [&>*]:font-inter [&>*]:text-[13px] [&>*]:text-primary-500 [&>*]:leading-4",
						wrapperClassName: "mt-6" + inputClassName(errors?.originationDate?.message),
						onChange: (date: Date): void => {
						setValue("originationDate", moment(date).format("MMDDYYYY"), {
							shouldValidate: true,
							shouldDirty: true,
						});
						},
					}}
				/>
				<Input
          data-testid="loan-information-prepayment-penalty"
					error={errors?.prepaymentPenalty?.message}
					label="Prepayment Penalty"
					placeholder="0%, (90 Days)"
					register={register("prepaymentPenalty")}
					wrapperClassName="mt-6"
					required
				/>
			</div>
			<Input
        data-testid="loan-information-collateral-tax-url"
				error={errors?.collaterals?.[0]?.taxUrl?.message}
				label="Tax Property URL"
				placeholder="Enter Tax Property URL"
				register={register("collaterals.0.taxUrl")}
				wrapperClassName="mt-6"
				required
			/>
			<Input
        data-testid="loan-information-collateral-link"
				error={errors?.collaterals?.[0]?.link?.message}
				label="Collateral Link (Google Drive)"
				placeholder="Enter Collateral Link"
				register={register("collaterals.0.link")}
				wrapperClassName="mt-6"
				required
			/>
			<Dropdown
        data-testid="loan-information-asset-type"
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
          data-testid="loan-information-loan-consultant"
					error={errors?.loanConsultant?.message}
					label="Loan Consultant"
					placeholder="Enter Loan Consultant"
					register={register("loanConsultant")}
					wrapperClassName="mt-6"
					required
				/>
				<FormatInput
          data-testid="loan-information-ltv"
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
        data-testid="loan-information-lead-source"
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
