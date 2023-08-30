import { FC } from "react";
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
import { defaultValues } from "@/features/create-loan/utils/values";
import {
	assetTypes,
	loanTypes,
	prepaymentPenalties,
} from "@/features/create-loan/utils/selects";

export const CreateLoan: FC = () => {
	const { control, handleSubmit, register } = useForm<LoanFields>({
		defaultValues,
	});
	const {
		append: appendCollateral,
		fields: collaterals,
		remove: removeCollateral,
	} = useFieldArray({
		control,
		name: "collaterals",
	});
	const {
		append: appendParticipant,
		fields: fundingBreakdown,
		remove: removeParticipant,
	} = useFieldArray({
		control,
		name: "fundingBreakdown",
	});

	const onSubmit = (data: LoanFields): void => {
		console.log(data);
	};

	const columns: Column[] = [
		{
			name: "Lender",
			selector: (row: FundingBreakdown): string => row.lender,
		},
		{
			cell: (row: FundingBreakdown, rowIndex) => (
				<input
					className="h-full w-full py-3 px-4 bg-white hover:bg-gray-200 focus-visible:border-gold-500 focus-visible:border-2 focus-visible:outline-none"
					key={`${row.lender}-${rowIndex}`}
					{...register(`fundingBreakdown.${rowIndex}.amount`)}
				/>
			),
			name: "Amount",
			style: { padding: 0 },
		},
		{
			cell: (row: FundingBreakdown, rowIndex) => (
				<input
					className="h-full w-full py-3 px-4 bg-white hover:bg-gray-200 focus-visible:border-gold-500 focus-visible:border-2 focus-visible:outline-none"
					key={`${row.lender}-${rowIndex}`}
					{...register(`fundingBreakdown.${rowIndex}.rate`)}
				/>
			),
			name: "Rate",
			style: { padding: 0 },
		},
		{
			cell: (row: FundingBreakdown, rowIndex) => (
				<input
					className="h-full w-full py-3 px-4 bg-white hover:bg-gray-200 focus-visible:border-gold-500 focus-visible:border-2 focus-visible:outline-none"
					key={`${row.lender}-${rowIndex}`}
					{...register(`fundingBreakdown.${rowIndex}.prorated`)}
				/>
			),
			name: "Prorated",
			style: { padding: 0 },
		},
		{
			cell: (row: FundingBreakdown, rowIndex) => (
				<input
					className="h-full w-full mx-[-16px] py-3 px-4 bg-white hover:bg-gray-200 focus-visible:border-gold-500 focus-visible:border-2 focus-visible:outline-none"
					key={`${row.lender}-${rowIndex}`}
					{...register(`fundingBreakdown.${rowIndex}.regular`)}
				/>
			),
			name: "Regular",
			style: { padding: 0 },
		},
		{
			cell: (row: FundingBreakdown, rowIndex) => (
				<>
					{row.type === "participant" && (
						<Button
							className="bg-white px-0 py-2 mr-2"
							icon={<Icon name="trashBin" color="#FF0033" width="24" />}
							onClick={() => removeParticipant(rowIndex)}
							type="button"
						/>
					)}
				</>
			),
			maxWidth: "50px",
			name: "",
		},
	];

	return (
		<form
			className=" flex flex-col rounded-3xl bg-white gap-6 divide-y divide-gray-200 w-screen p-6 h-full overflow-y-auto"
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
					<div className="flex flex-row justify-between mb-2">
						<Title text="Multiple Collateral" />
						<Button
							className="rounded-3xl px-3 h-[34px] bg-gray-200"
							icon={<Icon name="plus" color="#0E2130" width="12" />}
							onClick={() =>
								appendCollateral({
									assetType: "",
									collateralAddress: "",
									insuranceExpirationDate: "",
									taxUrl: "",
								})
							}
							type="button"
						/>
					</div>
					<div className="max-h-[865px] overflow-y-auto">
						{collaterals.length ? (
							<div className="flex flex-col gap-4 divide-y divide-gray-200 ">
								{collaterals.map((item, index) => (
									<div key={item.id}>
										<div className="grid grid-cols-2 gap-6 mt-4">
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
															<Icon
																name="trashBin"
																color="#FF0033"
																width="24"
															/>
														}
														onClick={() => removeCollateral(index)}
														type="button"
													/>
												</div>
											</div>
										</div>
										<Input
											label="Tax URL"
											placeholder="Enter Tax URL"
											register={register(`collaterals.${index}.taxUrl`)}
											wrapperClassName="mt-6"
											required
										/>
										<Select
											className="mt-6"
											label="Asset Type"
											options={assetTypes}
											placeholder="Select Dropdown"
											register={register(`collaterals.${index}.assetType`)}
											required
										/>
									</div>
								))}
							</div>
						) : (
							<div className="flex flex-col h-[600px] mt-6 justify-center items-center rounded-xl border-[3px] border-dashed border-gray-200">
								<p className="font-inter text-[13px] text-primary-300 leading-4 tracking-[-0.65px]">
									No Collaterals added Yet
								</p>
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
									type="button"
								/>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="pt-6">
				<div className="flex flex-row justify-between">
					<Title text="Funding Breakdown" />
					<Button
						buttonText={
							<div className="ml-2 font-inter font-semibold text-sm text-primary leading-[17px] tracking-[-0.7px]">
								Add Participant
							</div>
						}
						className="rounded-2xl px-4 h-[34px] bg-gray-200"
						icon={<Icon name="plus" color="#0E2130" width="12" />}
						onClick={() =>
							appendParticipant({
								amount: "0",
								lender: "Select Participant",
								prorated: "0.00",
								rate: "0",
								regular: "0.00",
								type: "participant",
							})
						}
						type="button"
					/>
				</div>
				<Table
					className="my-6"
					columns={columns}
					data={fundingBreakdown}
					fixedHeader
					fixedHeaderScrollHeight="300px"
				/>
        <div></div>
				<Button
					buttonText="Save Loan"
					className="w-full rounded-2xl bg-gold-600 px-[18px] py-4 font-inter font-semibold text-sm text-primary-300 leading-[17px] tracking-[-0.7px]"
					type="submit"
				/>
			</div>
		</form>
	);
};
