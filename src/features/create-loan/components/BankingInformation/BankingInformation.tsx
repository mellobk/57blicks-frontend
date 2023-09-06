import type { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Title } from "@/features/create-loan/components/Title/Title";
import { LoanFields } from "@/features/create-loan/types/fields";
import { accountTypes } from "@/features/create-loan/utils/selects";

interface Props {
	register: UseFormRegister<LoanFields>;
}

export const BankingInformation: FC<Props> = ({ register }) => (
	<div className="pt-6">
		<Title text="Banking Information" />
		<Input
			label="Bank Name"
			placeholder="Enter Bank Name"
			register={register("bankingName")}
			wrapperClassName="mt-6"
		/>
		<Input
			label="Routing Number"
			placeholder="Enter Routing Number"
			register={register("routingNumber")}
			wrapperClassName="mt-6"
		/>
		<Input
			label="Account Number"
			placeholder="Enter Account Number"
			register={register("accountNumber")}
			wrapperClassName="mt-6"
		/>
		<Select
			className="mt-6"
			label="Account Type"
			options={accountTypes}
			placeholder="Select Account Type"
			register={register("accountType")}
		/>
	</div>
);
