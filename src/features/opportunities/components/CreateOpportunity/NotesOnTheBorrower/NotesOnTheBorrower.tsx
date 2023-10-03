import type { FC } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Dropdown } from "@/components/forms/Dropdown";
import { Input } from "@/components/forms/Input";
import { Title } from "@/components/ui/Title/Title.tsx";
import { Opportunity } from "@/features/opportunities/types/fields.ts";
import { DKC_REPEAT_BORROWER } from "@/features/create-loan/utils/selects.ts";

interface Props {
	control: Control<Opportunity>;
	errors: FieldErrors<Opportunity>;
	register: UseFormRegister<Opportunity>;
}

export const NotesOnTheBorrower: FC<Props> = ({
	control,
	errors,
	register,
}) => (
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
		<Dropdown
			control={control}
			error={errors?.dkcRepeatBorrower?.message}
			className="mt-6"
			label="DKC Repeat Borrower"
			name="dkcRepeatBorrower"
			options={DKC_REPEAT_BORROWER}
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
