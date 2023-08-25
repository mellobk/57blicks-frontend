import type { FC } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";

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

type FormData = {
	amountDrawn: string;
	assetClass: string;
	borrowerEmailAddress: string;
	borrowerLlc: string;
	borrowerPhoneNumber: string;
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
	const { handleSubmit, register, watch } = useForm<FormData>();
	const loanType = watch("loanType");

	const onSubmit = (data: FormData) => {
		console.log(data);
	};

	return (
		<form className="" onSubmit={handleSubmit(onSubmit)}>
			<div className="grid grid-rows-2 gap-6 divide-y divide-gray-200 w-screen m-6">
				<div className="grid grid-cols-3 gap-6 divide-x divide-gray-200">
					<div>
						<h1 className="font-inter text-3xl leading-9">Loan Information</h1>
						<Select
							{...register("loanType")}
							label="Loan Type"
							placeholder="Select Loan Type"
							options={LOAN_TYPES}
							required
						/>
						<Input
							{...register("collateralAddress")}
							label="Collateral Address"
							placeholder="Enter Collateral Address"
							disabled={!!loanType}
							required
						/>
						<div className="grid grid-cols-2 gap-6">
							<Input
								{...register("totalLoanAmount")}
								label="Total Loan Amount"
								placeholder="$0.00"
								disabled={!!loanType}
								required
							/>
							<Input
								{...register("interestRate")}
								label="Interest Rate"
								placeholder="0%"
								disabled={!!loanType}
								required
							/>
						</div>
						<div className="grid grid-cols-2 gap-6">
							<Input
								{...register("originationDate")}
								label="Origination Date"
								placeholder="MM-DD-YYYY"
								disabled={!!loanType}
								required
							/>
							<Input
								{...register("maturityDate")}
								label="Maturity Date"
								placeholder="MM-DD-YYYY"
								disabled={!!loanType}
								required
							/>
						</div>
						<div className="grid grid-cols-2 gap-6">
							<Input
								{...register("constructionHoldback")}
								label="Construction Holdback"
								placeholder="$0.00"
								disabled={!!loanType}
								required
							/>
							<Input
								{...register("amountDrawn")}
								label="Amount Drawn"
								placeholder="$0.00"
								disabled={!!loanType}
								required
							/>
						</div>
						<div className="grid grid-cols-2 gap-6">
							<Input
								{...register("insuranceExpirationDate")}
								label="Insurance Expiration Date"
								placeholder="MM-DD-YYYY"
								disabled={!!loanType}
								required
							/>
							<Input
								{...register("prepaymentPenalty")}
								label="Prepayment Penalty"
								placeholder="0%, (90 Days)"
								disabled={!!loanType}
								required
							/>
						</div>
						<Input
							{...register("taxUrl")}
							label="Tax URL"
							placeholder="Enter Tax URL"
							disabled={!!loanType}
							required
						/>
						<Input
							{...register("collateralLink")}
							label="Collateral Link (Google Drive)"
							placeholder="Enter Collateral Link"
							disabled={!!loanType}
							required
						/>
						<Input
							{...register("assetClass")}
							label="Asset Class"
							placeholder="Filled"
							disabled={!!loanType}
							required
						/>
					</div>

					<div className="pl-6">
						<h1 className="font-inter text-3xl leading-9">
							Borrower Information
						</h1>
						<Input
							{...register("borrowerLlc")}
							label="Borrower LLC"
							placeholder="Enter Borrower LLC"
							disabled={!!loanType}
							required
						/>
						<div className="grid grid-cols-2 gap-6">
							<Input
								{...register("firstName")}
								label="First Name"
								placeholder="Enter First Name"
								disabled={!!loanType}
								required
							/>
							<Input
								{...register("lastName")}
								label="Last Name"
								placeholder="Enter Last Name"
								disabled={!!loanType}
								required
							/>
						</div>
						<Input
							{...register("borrowerPhoneNumber")}
							label="Borrower Phone Number"
							placeholder="XXX - XXX - XXXX"
							disabled={!!loanType}
							required
						/>
						<Input
							{...register("borrowerEmailAddress")}
							label="Borrower Email Address"
							placeholder="Enter Borrower Email Address"
							disabled={!!loanType}
							required
						/>
						<Input
							{...register("einSsn")}
							label="EIN/SSN"
							placeholder="Enter EIN/SSN"
							disabled={!!loanType}
							required
						/>
						<Input
							{...register("mailingAddress")}
							label="Mailing Address"
							placeholder="Enter Mailing Address"
							disabled={!!loanType}
							required
						/>
					</div>

					<div className="pl-6">
						<h1 className="font-inter text-3xl leading-9 pb-3">
							Multiple Collateral
						</h1>
					</div>
				</div>

				<div className="pt-6">
					<h1 className="font-inter text-3xl leading-9 pb-3">
						Loan Information
					</h1>
					<button type="submit">Submit</button>
				</div>
			</div>
		</form>
	);
};
