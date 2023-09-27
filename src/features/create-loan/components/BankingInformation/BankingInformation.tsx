import type { FC } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Dropdown } from "@/components/forms/Dropdown";
import { Input } from "@/components/forms/Input";
import { Title } from "@/components/ui/Title/Title";
import { Loan } from "@/features/create-loan/types/fields";
import { ACCOUNT_TYPES } from "@/features/create-loan/utils/selects";

interface Props {
	control: Control<Loan>;
	errors: FieldErrors<Loan>;
	register: UseFormRegister<Loan>;
}

export const BankingInformation: FC<Props> = ({
	control,
	errors,
	register,
}) => (
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
		<Dropdown
			control={control}
			error={errors?.borrower?.accountType?.message}
			className="mt-6"
			label="Account Type"
			name="borrower.accountType"
			options={ACCOUNT_TYPES}
		/>
	</div>
);
