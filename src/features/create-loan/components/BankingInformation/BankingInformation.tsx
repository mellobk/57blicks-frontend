import type { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Title } from "@/components/ui/Title/Title";
import { Loan } from "@/features/create-loan/types/fields";
import { accountTypes } from "@/features/create-loan/utils/selects";

interface Props {
	errors: FieldErrors<Loan>;
	register: UseFormRegister<Loan>;
}

export const BankingInformation: FC<Props> = ({ errors, register }) => (
	<div className="pt-6">
		<Title text="Banking Information" />
		<Input
			error={errors?.borrower?.bankingName?.message}
			label="Banking Name"
			placeholder="Enter Banking Name"
			register={register("borrower.bankingName")}
			wrapperClassName="mt-6"
		/>
		<Input
			error={errors?.borrower?.routingNumber?.message}
			label="Routing Number"
			placeholder="Enter Routing Number"
			register={register("borrower.routingNumber")}
			wrapperClassName="mt-6"
		/>
		<Input
			error={errors?.borrower?.accountNumber?.message}
			label="Account Number"
			placeholder="Enter Account Number"
			register={register("borrower.accountNumber")}
			type="number"
			wrapperClassName="mt-6"
		/>
		<Select
			className="mt-6"
			error={errors?.borrower?.accountType?.message}
			label="Account Type"
			options={accountTypes}
			placeholder="Select Account Type"
			register={register("borrower.accountType")}
		/>
	</div>
);
