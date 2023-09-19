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
			error={errors?.investmentBorrower?.message}
			label="Investment Borrower"
			placeholder="Enter Investment Borrower"
			register={register("investmentBorrower")}
			wrapperClassName="mt-6"
			required
		/>
		<Input
			error={errors?.dkcRepeatBorrower?.message}
			label="DKC Repeat Borrower"
			placeholder="Enter DKC Repeat Borrower"
			register={register("dkcRepeatBorrower")}
			wrapperClassName="mt-6"
			required
		/>
		<Input
			error={errors?.investmentBorrowerBackground?.message}
			label="Investment Borrower Background"
			placeholder="Enter Investment Borrower Background"
			register={register("investmentBorrowerBackground")}
			wrapperClassName="mt-6"
			required
		/>
	</div>
);
