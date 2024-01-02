/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { FC } from "react";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Dropdown } from "@/components/forms/Dropdown";
import { Input } from "@/components/forms/Input";
import { Title } from "@/components/ui/Title/Title";
import type { Loan } from "@/features/admin/components/create-loan/types/fields";
import { ACCOUNT_TYPES } from "@/features/admin/components/create-loan/utils/selects";

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
			data-testid="banking-information-account-name"
			error={errors?.borrower?.accountName?.message}
			label="Account Name"
			placeholder="Enter Account Name"
			register={register("borrower.accountName")}
			wrapperClassName="mt-6"
		/>

		<Input
			data-testid="banking-information-banking-name"
			error={errors?.borrower?.bankingName?.message}
			label="Banking Name"
			placeholder="Enter Banking Name"
			register={register("borrower.bankingName")}
			wrapperClassName="mt-6"
		/>
		<Input
			data-testid="banking-information-routing-number"
			error={errors?.borrower?.routingNumber?.message}
			label="Routing Number"
			placeholder="Enter Routing Number"
			register={register("borrower.routingNumber")}
			type="number"
			wrapperClassName="mt-6"
		/>
		<Input
			data-testid="banking-information-account-number"
			error={errors?.borrower?.accountNumber?.message}
			label="Account Number"
			placeholder="Enter Account Number"
			register={register("borrower.accountNumber")}
			type="number"
			wrapperClassName="mt-6"
		/>
		<Dropdown
			data-testid="banking-information-account-type"
			control={control}
			error={errors?.borrower?.accountType?.message}
			className="mt-6"
			label="Account Type"
			name="borrower.accountType"
			options={ACCOUNT_TYPES}
		/>
	</div>
);
