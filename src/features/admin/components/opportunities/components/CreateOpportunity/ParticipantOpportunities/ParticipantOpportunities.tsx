import type { FC } from "react";
import { useEffect } from "react";
import type { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { Title } from "@/components/ui/Title";
import type { Opportunity } from "@/features/admin/components/opportunities/types/fields.ts";
import { Switch } from "@/features/admin/components/opportunities/components/CreateOpportunity/ParticipantOpportunities/Switch/Switch.tsx";

interface Props {
	control: Control<Opportunity>;
	errors: FieldErrors<Opportunity>;
	setValue: UseFormSetValue<Opportunity>;
}

export const ParticipantOpportunities: FC<Props> = ({
	control,
	errors,
	setValue,
}) => {
	const [loanAmount, participantOpportunities] = useWatch({
		control,
		name: ["loanAmount", "participantOpportunities"],
	});

	const onChange = (checked: boolean, percentage: "99%" | "75%" | "50%") => {
		setValue(
			`participantOpportunities.${percentage}`,
			checked
				? String((Number(loanAmount) * (parseInt(percentage) / 100)).toFixed(2))
				: ""
		);
	};

	useEffect(() => {
		onChange(!!participantOpportunities["99%"], "99%");
		onChange(!!participantOpportunities["75%"], "75%");
		onChange(!!participantOpportunities["50%"], "50%");
	}, [loanAmount]);

	return (
		<div>
			<Title text="Participant Opportunities" />
			<div className="grid xl:grid-cols-3 grid-cols-1 xl:gap-6">
				<Switch
					control={control}
					errors={errors}
					onChange={onChange}
					percentage={"99%"}
				/>
				<Switch
					control={control}
					errors={errors}
					onChange={onChange}
					percentage={"75%"}
				/>
				<Switch
					control={control}
					errors={errors}
					onChange={onChange}
					percentage={"50%"}
				/>
			</div>
		</div>
	);
};
