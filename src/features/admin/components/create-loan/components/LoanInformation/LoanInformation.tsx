/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC, useEffect, useState } from "react";
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
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { CreateLoanConsultant } from "../CreateLoanConsultant/CreateLoanConsultant";
import { useQuery } from "@tanstack/react-query";
import ManageLoanConsultantService from "../../../servicing/api/loan-consultant";

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
	const [getAllConsultants, setGetAllConsultants] = useState<
		Array<{
			code: string;
			id: number;
			name: string;
		}>
	>();

	const loanConsultantQuery = useQuery(
		["all-loan-consultants-loan"],
		() => {
			return ManageLoanConsultantService.getAllLoansConsultants();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	useEffect(() => {
		const consultantsOptions: any = loanConsultantQuery?.data
			?.data as unknown as Array<{ name: string }>;

		setGetAllConsultants(
			consultantsOptions?.map((data: { name: any }) => {
				return { code: data.name, name: data.name };
			})
		);
	}, [loanConsultantQuery.isFetching]);

	const [openCreateLoanConsultant, setOpenCreateLoanConsultant] =
		useState<boolean>(false);
	const [totalLoanAmount, constructionHoldback] = useWatch({
		control,
		name: ["totalLoanAmount", "constructionHoldback"],
	});

	useEffect(() => {
		setValue(
			"amountDrawn",
			String(
				(Number(totalLoanAmount) - Number(constructionHoldback) || 0)?.toFixed(
					2
				) || "0"
			)
		);
	}, [totalLoanAmount, constructionHoldback]);

	useEffect(() => {
		if (getAllConsultants) {
			const filterData = getAllConsultants.sort((a, b) => {
				// Assuming 'name' is the property by which you want to sort
				const nameA = a.code.toLowerCase(); // ignore upper and lowercase
				const nameB = b.code.toLowerCase(); // ignore upper and lowercase
				if (nameA < nameB) {
					return -1; //nameA comes first
				}
				if (nameA > nameB) {
					return 1; // nameB comes first
				}

				// names must be equal
				return 0;
			});

			setGetAllConsultants(filterData as any);
		}
	}, [getAllConsultants]);

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
						className:
							"[&>*]:flex [&>*]:w-50 [&>*]:h-10 [&>*]:py-3 [&>*]:px-4 [&>*]:self-stretch [&>*]:rounded-md [&>*]:placeholder-gray-400 [&>*]:bg-gray-200 [&>*]:border-gray-200 [&>*]:font-inter [&>*]:text-[13px] [&>*]:text-primary-500 [&>*]:leading-4",
						wrapperClassName:
							"mt-6" + inputClassName(errors?.originationDate?.message),
						onChange: (date: Date): void => {
							setValue("originationDate", moment(date).format("MM-DD-YYYY"));
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
						name: "maturityDate",
						className:
							"[&>*]:flex [&>*]:w-50 [&>*]:h-10 [&>*]:py-3 [&>*]:px-4 [&>*]:self-stretch [&>*]:rounded-md [&>*]:placeholder-gray-400 [&>*]:bg-gray-200 [&>*]:border-gray-200 [&>*]:font-inter [&>*]:text-[13px] [&>*]:text-primary-500 [&>*]:leading-4",
						wrapperClassName:
							"mt-6" + inputClassName(errors?.maturityDate?.message),
						onChange: (date: Date): void => {
							setValue("maturityDate", moment(date).format("MM-DD-YYYY"), {
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
						name: "collaterals.0.insuranceExpirationDate",
						className:
							"[&>*]:flex [&>*]:w-50 [&>*]:h-10 [&>*]:py-3 [&>*]:px-4 [&>*]:self-stretch [&>*]:rounded-md [&>*]:placeholder-gray-400 [&>*]:bg-gray-200 [&>*]:border-gray-200 [&>*]:font-inter [&>*]:text-[13px] [&>*]:text-primary-500 [&>*]:leading-4",
						wrapperClassName:
							"mt-6" + inputClassName(errors?.collaterals?.message),
						onChange: (date: Date): void => {
							setValue(
								"collaterals.0.insuranceExpirationDate",
								moment(date).format("MM-DD-YYYY"),
								{
									shouldValidate: true,
									shouldDirty: true,
								}
							);
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
				{/* 	<div style={{ display: "flex", alignItems: "end", gap: "5px" }}>
					<Dropdown
						data-testid="loan-information-lead-source"
						control={control}
						error={errors?.loanConsultant?.message}
						className="mt-6 w-full"
						label="Loan Consultant"
						name="loanConsultant"
						options={getAllConsultants}
						required
					/>
					<Input
						data-testid="loan-information-loan-consultant"
						error={errors?.loanConsultant?.message}
						label="Loan Consultant"
						placeholder="Enter Loan Consultant"
						register={register("loanConsultant")}
						wrapperClassName="mt-6"
						required
					/>
					<div
						style={{
							background: "transparent",
							width: "25px",
							height: "25px",
							borderRadius: "60px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							marginBottom: "8px",
							cursor: "pointer",
						}}
					>
							<div
							onClick={() => {
								setOpenCreateLoanConsultant(true);
							}}
						>
							<Icon name="plus" width="15" />
						</div>
					</div>
				</div> */}
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

			<Modal
				visible={openCreateLoanConsultant}
				onHide={() => {
					setOpenCreateLoanConsultant(false);
					void loanConsultantQuery.refetch();
				}}
				title="Create Loan Consultant"
				width="450px"
			>
				<CreateLoanConsultant />
			</Modal>
		</div>
	);
};
