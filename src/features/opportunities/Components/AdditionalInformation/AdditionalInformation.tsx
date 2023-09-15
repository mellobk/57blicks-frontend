import type { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Title } from "@/components/ui/Title/Title";
import { Opportunity } from "@/features/opportunities/types/fields";
import { TextArea } from "@/components/forms/TextArea";

interface Props {
	errors: FieldErrors<Opportunity>;
	register: UseFormRegister<Opportunity>;
}

export const AdditionalInformation: FC<Props> = ({ errors, register }) => (
	<div>
		<Title text="Additional Information" />
		<TextArea
			error={errors?.investmentSummary?.message}
			label="Additional Information"
			maxLength={2000}
			placeholder="Limit 2000 Characters"
			register={register("investmentSummary")}
			wrapperClassName="mt-6"
			required
		/>
	</div>
);
