import type { FC } from "react";
import { FormatInput } from "@/components/forms/FormatInput";
import { Toggle } from "@/components/ui/Toggle";
import { Control, FieldErrors, useWatch } from "react-hook-form";
import { Opportunity } from "@/features/opportunities/types/fields.ts";

interface Props {
	control: Control<Opportunity>;
	errors: FieldErrors<Opportunity>;
	onChange: (checked: boolean, percentage: "99%" | "75%" | "50%") => void;
	percentage: "99%" | "75%" | "50%";
}

export const Switch: FC<Props> = ({
	control,
	errors,
	onChange,
	percentage,
}) => {
	const participantOpportunities = useWatch({
		control,
		name: "participantOpportunities",
	});

	return (
		<div className="relative" key={percentage}>
			<FormatInput
				className={
					!!participantOpportunities[percentage]
						? "disabled:bg-green-500/[16%] disabled:text-green-500"
						: ""
				}
				control={control}
				error={errors?.participantOpportunities?.[percentage]?.message}
				format="money"
				name={`participantOpportunities.${percentage}`}
				placeholder={percentage}
				wrapperClassName="mt-6"
				disabled
			/>
			<div className="absolute bottom-3 right-3">
				<Toggle
					checked={!!participantOpportunities[percentage]}
					checkedClassName="bg-green-500"
					onChecked={(data) => onChange(data.target.checked, percentage)}
				/>
			</div>
		</div>
	);
};
