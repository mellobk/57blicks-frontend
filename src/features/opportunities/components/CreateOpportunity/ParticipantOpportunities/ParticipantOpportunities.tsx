import type { FC } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { FormatInput } from "@/components/forms/FormatInput";
import { Title } from "@/components/ui/Title";
import { Opportunity } from "@/features/opportunities/types/fields.ts";

interface Props {
	control: Control<Opportunity>;
	errors: FieldErrors<Opportunity>;
}

export const ParticipantOpportunities: FC<Props> = ({ control, errors }) => (
	<div>
		<Title text="Participant Opportunities" />
		<div className="grid xl:grid-cols-3 grid-cols-1 xl:gap-6">
			<FormatInput
				control={control}
				error={errors?.participantOpportunities?.["99%"]?.message}
				format="money"
				name="participantOpportunities.99%"
				placeholder="99%"
				wrapperClassName="mt-6"
				required
			/>
			<FormatInput
				control={control}
				error={errors?.participantOpportunities?.["75%"]?.message}
				format="money"
				name="participantOpportunities.75%"
				placeholder="75%"
				wrapperClassName="mt-6"
				required
			/>
			<FormatInput
				control={control}
				error={errors?.participantOpportunities?.["50%"]?.message}
				format="money"
				name="participantOpportunities.50%"
				placeholder="50%"
				wrapperClassName="mt-6"
				required
			/>
		</div>
	</div>
);
