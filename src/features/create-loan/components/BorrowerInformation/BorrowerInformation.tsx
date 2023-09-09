import type { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { Title } from "@/components/ui/Title/Title";
import { LoanFields } from "@/features/create-loan/types/fields";

interface Props {
	errors: FieldErrors<LoanFields>;
	register: UseFormRegister<LoanFields>;
}

export const BorrowerInformation: FC<Props> = ({ errors, register }) => (
	<div>
		<Title text="Borrower Information" />
		<Input
      error={errors?.borrowerLlc?.message}
			label="Borrower LLC"
			placeholder="Enter Borrower LLC"
			register={register("borrowerLlc")}
			wrapperClassName="mt-6"
			required
		/>
		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6  items-end">
			<Input
        error={errors?.firstName?.message}
				label="First Name"
				placeholder="Enter First Name"
				register={register("firstName")}
				wrapperClassName="mt-6"
				required
			/>
			<Input
        error={errors?.lastName?.message}
				label="Last Name"
				placeholder="Enter Last Name"
				register={register("lastName")}
				wrapperClassName="mt-6"
				required
			/>
		</div>
		<Input
      error={errors?.borrowerPhoneNumber?.message}
			label="Borrower Phone Number"
			placeholder="XXX - XXX - XXXX"
			register={register("borrowerPhoneNumber")}
			wrapperClassName="mt-6"
			required
		/>
		<Input
      error={errors?.borrowerEmailAddress?.message}
			label="Borrower Email Address"
			placeholder="Enter Borrower Email Address"
			register={register("borrowerEmailAddress")}
			wrapperClassName="mt-6"
			required
		/>
		<Input
      error={errors?.einSsn?.message}
			label="EIN/SSN"
			placeholder="Enter EIN/SSN"
			register={register("einSsn")}
			wrapperClassName="mt-6"
			required
		/>
		<Input
      error={errors?.mailingAddress?.message}
			label="Mailing Address"
			placeholder="Enter Mailing Address"
			register={register("mailingAddress")}
			wrapperClassName="mt-6"
			required
		/>
	</div>
);
