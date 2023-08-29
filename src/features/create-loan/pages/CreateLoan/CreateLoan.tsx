import type { FC, ReactElement } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Column, Table } from "@/features/create-loan/components/Table/Table";
import { Title } from "@/features/create-loan/components/Title/Title";
import {
	FundingBreakdown,
	LoanFields,
} from "@/features/create-loan/types/fields";
import {
	assetTypes,
	loanTypes,
	prepaymentPenalties,
} from "@/features/create-loan/utils/selects.ts";

export const CreateLoan: FC = () => {
	const { control, handleSubmit, register } = useForm<LoanFields>();
	const {
		fields: collaterals,
		append: appendCollateral,
		remove: removeCollateral,
	} = useFieldArray({
		control,
		name: "collaterals",
	});
	const { remove: removeParticipant } = useFieldArray({
		control,
		name: "fundingBreakdown",
	});

	const onSubmit = (data: LoanFields): void => {
		console.log(data);
	};

	const columns: Column[] = [
		{
			name: "Lender",
			selector: (row: FundingBreakdown): ReactElement => (
				<input value={row.lender} />
			),
		},
		{
			name: "Amount",
			selector: (row: FundingBreakdown): any => <input value={row.amount} />,
		},
		{
			name: "Rate",
			selector: (row: FundingBreakdown): any => <input value={row.rate} />,
		},
		{
			name: "Prorated",
			selector: (row: FundingBreakdown): any => <input value={row.prorated} />,
		},
		{
			name: "Regular",
			selector: (row: FundingBreakdown): any => <input value={row.regular} />,
		},
		{
			name: "",
			maxWidth: "50px",
			selector: (row: FundingBreakdown): any => (
				<>
					{row.type === "participant" && (
						<Button
							className="bg-white px-0 py-2 mr-2"
							icon={<Icon name="trashBin" color="#FF0033" width="24" />}
							onClick={() => removeParticipant(row.id)}
						/>
					)}
				</>
			),
		},
	];

	const data = [
		{
			id: 1,
			lender: "DKC Lending LLC",
			amount: "0",
			rate: "0",
			prorated: "0.00",
			regular: "0.00",
		},
		{
			id: 2,
			lender: "DKC Servicing Fee Income",
			amount: "0",
			rate: "0",
			prorated: "0.00",
			regular: "0.00",
		},
		{
			id: 3,
			lender: "Yield Spread (optional)",
			amount: "0",
			rate: "0",
			prorated: "0.00",
			regular: "0.00",
		},
		{
			id: 4,
			lender: "Select Participant",
			amount: "0",
			rate: "0",
			prorated: "0.00",
			regular: "0.00",
		},
	];

	return (
		<form
			className="flex flex-col rounded-3xl bg-white gap-6 divide-y divide-gray-200 w-screen p-6 h-full overflow-y-auto"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="grid grid-cols-3 gap-6 divide-x divide-gray-200">
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
					<div className="grid grid-cols-2 gap-6">
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
					<div className="grid grid-cols-2 gap-6">
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
					<div className="grid grid-cols-2 gap-6">
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
					<div className="grid grid-cols-2 gap-6">
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

				<div className="pl-6">
					<Title text="Borrower Information" />
					<Input
						label="Borrower LLC"
						placeholder="Enter Borrower LLC"
						register={register("borrowerLlc")}
						wrapperClassName="mt-6"
						required
					/>
					<div className="grid grid-cols-2 gap-6">
						<Input
							label="First Name"
							placeholder="Enter First Name"
							register={register("firstName")}
							wrapperClassName="mt-6"
							required
						/>
						<Input
							label="Last Name"
							placeholder="Enter Last Name"
							register={register("lastName")}
							wrapperClassName="mt-6"
							required
						/>
					</div>
					<Input
						label="Borrower Phone Number"
						placeholder="XXX - XXX - XXXX"
						register={register("borrowerPhoneNumber")}
						wrapperClassName="mt-6"
						required
					/>
					<Input
						label="Borrower Email Address"
						placeholder="Enter Borrower Email Address"
						register={register("borrowerEmailAddress")}
						wrapperClassName="mt-6"
						required
					/>
					<Input
						label="EIN/SSN"
						placeholder="Enter EIN/SSN"
						register={register("einSsn")}
						wrapperClassName="mt-6"
						required
					/>
					<Input
						label="Mailing Address"
						placeholder="Enter Mailing Address"
						register={register("mailingAddress")}
						wrapperClassName="mt-6"
						required
					/>
				</div>

				<div className="pl-6">
					<div className="flex flex-row justify-between">
						<Title text="Multiple Collateral" />
						<Button
							className="rounded-3xl px-3 bg-gray-200"
							icon={<Icon name="plus" color="#0E2130" width="12" />}
							onClick={() =>
								appendCollateral({
									assetType: "",
									collateralAddress: "",
									insuranceExpirationDate: "",
									taxUrl: "",
								})
							}
						/>
					</div>
					<div className="max-h-[865px] overflow-y-auto">
						{collaterals.length ? (
							collaterals.map((item, index) => (
								<div className="w-full" key={item.id}>
									<div className="grid grid-cols-2 gap-6">
										<Input
											label="Collateral Address"
											placeholder="Enter Collateral Address"
											register={register(
												`collaterals.${index}.collateralAddress`
											)}
											required
										/>
										<div className="flex gap-6">
											<Input
												label="Insurance Expiration"
												placeholder="MM-DD-YYYY"
												register={register(
													`collaterals.${index}.insuranceExpirationDate`
												)}
												required
											/>
											<div className="flex items-end">
												<Button
													className="bg-white px-0 py-2 mr-2"
													icon={
														<Icon name="trashBin" color="#FF0033" width="24" />
													}
													onClick={() => removeCollateral(index)}
												/>
											</div>
										</div>
									</div>
									<Input
										label="Tax URL"
										placeholder="Enter Tax URL"
										register={register(`collaterals.${index}.taxUrl`)}
										required
									/>
									<Select
										label="Asset Type"
										options={assetTypes}
										placeholder="Select Dropdown"
										register={register(`collaterals.${index}.assetType`)}
										required
									/>
								</div>
							))
						) : (
							<div className="flex flex-col h-[600px] mt-6 justify-center items-center rounded-xl border-[3px] border-dashed border-gray-200">
								<text className="font-inter text-[13px] text-primary-300 leading-4 tracking-[-0.65px]">
									No Collaterals added Yet
								</text>
								<Button
									buttonText="Add Collateral"
									className="rounded-lg bg-primary-500 mt-4 px-8 py-[11px] font-inter font-semibold text-base text-white leading-[19px] tracking-tighter"
									onClick={() =>
										appendCollateral({
											assetType: "",
											collateralAddress: "",
											insuranceExpirationDate: "",
											taxUrl: "",
										})
									}
								/>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="pt-6">
				<Title text="Funding Breakdown" />
				<Table className="my-6" columns={columns} data={data} />
				<Button
					buttonText="Save Loan"
					className="w-full rounded-2xl bg-gold-600 px-[18px] py-4 font-inter font-semibold text-sm text-primary-300 leading-[17px] tracking-[-0.7px]"
				/>
			</div>
		</form>
	);
};
