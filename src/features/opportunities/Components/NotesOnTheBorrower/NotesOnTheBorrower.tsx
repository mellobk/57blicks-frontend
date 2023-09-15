import type { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { Title } from "@/components/ui/Title/Title";
import { Opportunity } from "@/features/opportunities/types/fields";

interface Props {
	errors: FieldErrors<Opportunity>;
	register: UseFormRegister<Opportunity>;
}

export const NotesOnTheBorrower: FC<Props> = ({ errors, register }) => (
	<div>
		<Title text="Notes on the Borrower" />
		<Input
			error={errors?.postTitle?.message}
			label="Investment Borrower"
			placeholder="Enter Investment Borrower"
			register={register("postTitle")}
			wrapperClassName="mt-6"
			required
		/>
		<Input
			error={errors?.investmentCollateral?.message}
			label="DKC Repeat Borrower"
			placeholder="Enter DKC Repeat Borrower"
			register={register("investmentCollateral")}
			wrapperClassName="mt-6"
			required
		/>
		<Input
			error={errors?.googleDriveLink?.message}
			label="Investment Borrower Background"
			placeholder="Enter Investment Borrower Background"
			register={register("googleDriveLink")}
			wrapperClassName="mt-6"
			required
		/>
	</div>
);
