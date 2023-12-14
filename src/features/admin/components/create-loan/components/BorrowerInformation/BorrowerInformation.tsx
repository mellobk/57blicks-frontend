import type { FC } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { Control } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { MaskInput } from "@/components/forms/MaskInput";
import { Title } from "@/components/ui/Title/Title";
import type { Loan } from "@/features/admin/components/create-loan/types/fields";

interface Props {
	control: Control<Loan>;
	errors: FieldErrors<Loan>;
	register: UseFormRegister<Loan>;
}

export const BorrowerInformation: FC<Props> = ({ errors, register }) => (
	<div>
		<Title text="Borrower Information" />
		<Input
			data-testid="borrower-information-llc"
			error={errors?.borrower?.llc?.message}
			label="Borrower LLC"
			name="borrower.llc"
			placeholder="Enter Borrower LLC"
			register={register("borrower.llc")}
			wrapperClassName="mt-6"
			required
		/>

		<div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6">
			<Input
				data-testid="borrower-information-first-name"
				error={errors?.borrower?.user?.firstName?.message}
				label="First Name"
				placeholder="Enter First Name"
				register={register("borrower.user.firstName")}
				wrapperClassName="mt-6"
				required
			/>
			<Input
				data-testid="borrower-information-last-name"
				error={errors?.borrower?.user?.lastName?.message}
				label="Last Name"
				placeholder="Enter Last Name"
				register={register("borrower.user.lastName")}
				wrapperClassName="mt-6"
				required
			/>
		</div>
		<MaskInput
			data-testid="borrower-information-phone-number"
			error={errors?.borrower?.user?.phoneNumber?.message}
			label="Borrower Phone Number"
			mask="(999) 999-9999"
			placeholder="(XXX) XXX-XXXX"
			register={register("borrower.user.phoneNumber")}
			wrapperClassName="mt-6"
			required
		/>
		<Input
			data-testid="borrower-information-email"
			error={errors?.borrower?.user?.email?.message}
			label="Borrower Email Address"
			placeholder="Enter Borrower Email Address"
			register={register("borrower.user.email")}
			wrapperClassName="mt-6"
			required
		/>
		<MaskInput
			data-testid="borrower-Information-ssn-ein"
			error={errors?.borrower?.ssnEin?.message}
			label="EIN/SSN"
			mask="999999999"
			placeholder="Enter EIN/SSN"
			register={register("borrower.ssnEin")}
			wrapperClassName="mt-6"
		/>
		<Input
			data-testid="borrower-Information-mailing-address"
			error={errors?.borrower?.user?.mailingAddress?.message}
			label="Mailing Address"
			placeholder="Enter Mailing Address"
			register={register("borrower.user.mailingAddress")}
			wrapperClassName="mt-6"
			required
		/>
	</div>
);
