import type { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { Title } from "@/features/create-loan/components/Title/Title";
import { LoanFields } from "@/features/create-loan/types/fields";

interface Props {
	register: UseFormRegister<LoanFields>;
}

export const BorrowerInformation: FC<Props> = ({ register }) => (
	<div>
		<Title text="Borrower Information" />
		<Input
			label="Borrower LLC"
			placeholder="Enter Borrower LLC"
			register={register("borrowerLlc")}
			wrapperClassName="mt-6"
			required
		/>
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6  items-end">
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
);
