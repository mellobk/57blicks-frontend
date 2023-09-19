import type { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { Title } from "@/components/ui/Title/Title";
import { Opportunity } from "@/features/opportunities/types/fields";

interface Props {
	errors: FieldErrors<Opportunity>;
	register: UseFormRegister<Opportunity>;
}

export const ParticipantOpportunities: FC<Props> = ({ errors, register }) => (
	<div>
		<Title text="Participant Opportunities" />
		<div className="grid xl:grid-cols-3 grid-cols-1 xl:gap-6 items-end">
			<Input
				error={errors?.participantOpportunities?.[0]?.message}
				placeholder="90%"
				register={register("participantOpportunities.0")}
				wrapperClassName="mt-6"
				required
			/>
			<Input
				error={errors?.participantOpportunities?.[1]?.message}
				placeholder="75%"
				register={register("participantOpportunities.1")}
				wrapperClassName="mt-6"
				required
			/>
			<Input
				error={errors?.participantOpportunities?.[2]?.message}
				placeholder="50%"
				register={register("participantOpportunities.2")}
				wrapperClassName="mt-6"
				required
			/>
		</div>
	</div>
);
