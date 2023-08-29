import type { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import Title from "@/features/create-loan/components/Title/Title.tsx";

const ASSET_TYPES = [
	{ value: "sfr", label: "SFR" },
	{ value: "mf_4_less", label: "MF (4 or less)" },
	{ value: "mf_more_4", label: "MF (+4)" },
	{ value: "duplex", label: "Duplex" },
	{ value: "triplex", label: "Triplex" },
	{ value: "comm_office", label: "Commercial Office" },
	{ value: "vacant_land", label: "Vacant Land" },
	{ value: "manufactured_mh", label: "Manufactured/MH" },
	{ value: "condo", label: "Condo" },
	{ value: "townhome", label: "Townhome" },
	{ value: "villa", label: "Villa" },
	{ value: "comm_warehouse", label: "Commercial-Warehouse" },
	{ value: "comm_other", label: "Commercial-Other" },
];

const LOAN_TYPES = [
	{
		value: "fix_and_flip",
		label: "Fix and Flip Loans",
	},
	{
		value: "new_construction",
		label: "New Construction Loans",
	},
	{
		value: "cash_out_refinance",
		label: "Cash Out Refinance Loans",
	},
	{
		value: "cash_out_refinance_tampa",
		label: "Cash Out Refinance Loans in Tampa, Florida",
	},
	{
		value: "fix_and_lease",
		label: "Fix and Lease Loans",
	},
	{
		value: "non_recourse",
		label: "Non-Recourse Loans",
	},
	{
		value: "manufactured_mobile_home",
		label: "Manufactured Mobile Home Loan",
	},
	{
		value: "transactional_funding",
		label: "Transactional Funding",
	},
	{
		value: "capital_markets",
		label: "Capital Markets",
	},
];

const PREPAYMENT_PENALTY = [
	{ value: "90_days_2%", label: "90 - Days - 2%" },
	{ value: "mf_4_less", label: "MF (4 or less)" },
];

type Collateral = {
	assetType: string;
	collateralAddress: string;
	insuranceExpirationDate: string;
	taxUrl: string;
};

type FormData = {
	amountDrawn: string;
	assetType: string;
	borrowerEmailAddress: string;
	borrowerLlc: string;
	borrowerPhoneNumber: string;
	collaterals: Collateral[];
	collateralAddress: string;
	collateralLink: string;
	constructionHoldback: string;
	einSsn: string;
	firstName: string;
	insuranceExpirationDate: string;
	interestRate: string;
	lastName: string;
	loanType: string;
	mailingAddress: string;
	maturityDate: string;
	originationDate: string;
	prepaymentPenalty: string;
	taxUrl: string;
	totalLoanAmount: string;
};

export const CreateLoan: FC = () => {
	const { control, handleSubmit, register } = useForm<FormData>();
	const { fields, append, remove } = useFieldArray({
		control,
		name: "collaterals",
	});

	const onSubmit = (data: FormData): void => {
		console.log(data);
	};

	return (
		<form
			className="flex flex-col rounded-3xl bg-white gap-6 divide-y divide-gray-200 w-screen p-6 h-full overflow-y-auto"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="grid grid-cols-3 gap-6 divide-x divide-gray-200">
				<div>
					<Title text="Loan Information" />
					<Select
						label="Loan Type"
						options={LOAN_TYPES}
						placeholder="Select Loan Type"
						register={register("loanType")}
						required
					/>
					<Input
						label="Collateral Address"
						placeholder="Enter Collateral Address"
						register={register("collateralAddress")}
						required
					/>
					<div className="grid grid-cols-2 gap-6">
						<Input
							label="Total Loan Amount"
							placeholder="$0.00"
							register={register("totalLoanAmount")}
							required
						/>
						<Input
							label="Interest Rate"
							placeholder="0%"
							register={register("interestRate")}
							required
						/>
					</div>
					<div className="grid grid-cols-2 gap-6">
						<Input
							label="Origination Date"
							placeholder="MM-DD-YYYY"
							register={register("originationDate")}
							required
						/>
						<Input
							label="Maturity Date"
							placeholder="MM-DD-YYYY"
							register={register("maturityDate")}
							required
						/>
					</div>
					<div className="grid grid-cols-2 gap-6">
						<Input
							label="Construction Holdback"
							placeholder="$0.00"
							register={register("constructionHoldback")}
							required
						/>
						<Input
							label="Amount Drawn"
							placeholder="$0.00"
							register={register("amountDrawn")}
							required
						/>
					</div>
					<div className="grid grid-cols-2 gap-6">
						<Input
							label="Insurance Expiration Date"
							placeholder="MM-DD-YYYY"
							register={register("insuranceExpirationDate")}
							required
						/>
						<Select
							label="Prepayment Penalty"
							options={PREPAYMENT_PENALTY}
							placeholder="0%, (90 Days)"
							register={register("prepaymentPenalty")}
							required
						/>
					</div>
					<Input
						label="Tax Property URL"
						placeholder="Enter Tax Property URL"
						register={register("taxUrl")}
						required
					/>
					<Input
						label="Collateral Link (Google Drive)"
						placeholder="Enter Collateral Link"
						register={register("collateralLink")}
						required
					/>
					<Select
						label="Asset Type"
						options={ASSET_TYPES}
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
						required
					/>
					<div className="grid grid-cols-2 gap-6">
						<Input
							label="First Name"
							placeholder="Enter First Name"
							register={register("firstName")}
							required
						/>
						<Input
							label="Last Name"
							placeholder="Enter Last Name"
							register={register("lastName")}
							required
						/>
					</div>
					<Input
						label="Borrower Phone Number"
						placeholder="XXX - XXX - XXXX"
						register={register("borrowerPhoneNumber")}
						required
					/>
					<Input
						label="Borrower Email Address"
						placeholder="Enter Borrower Email Address"
						register={register("borrowerEmailAddress")}
						required
					/>
					<Input
						label="EIN/SSN"
						placeholder="Enter EIN/SSN"
						register={register("einSsn")}
						required
					/>
					<Input
						label="Mailing Address"
						placeholder="Enter Mailing Address"
						register={register("mailingAddress")}
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
								append({
									assetType: "",
									collateralAddress: "",
									insuranceExpirationDate: "",
									taxUrl: "",
								})
							}
						/>
					</div>
					<div className="max-h-[865px] overflow-y-auto">
						{fields.length ? (
							fields.map((item, index) => (
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
													onClick={() => remove(index)}
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
										options={ASSET_TYPES}
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
										append({
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
				<Button
					buttonText="Save Loan"
					className="w-full rounded-2xl bg-gold-600 px-[18px] py-4 font-inter font-semibold text-sm text-primary-300 leading-[17px] tracking-[-0.7px]"
				/>
			</div>
		</form>
	);
};
