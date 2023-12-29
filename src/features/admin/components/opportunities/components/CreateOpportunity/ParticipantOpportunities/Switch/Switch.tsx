import { Control, FieldErrors, useWatch } from "react-hook-form";

import type { FC } from "react";
import { FormatInput } from "@/components/forms/FormatInput";
import { Opportunity } from "@/features/admin/components/opportunities/types/fields";
import { Toggle } from "@/components/ui/Toggle";

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
		<div className=" relative" key={percentage}>
			<FormatInput
				className={
					!!participantOpportunities[percentage]
						? "disabled:bg-green-500/[0.2] disabled:text-green-500"
						: "   "
				}
				control={control}
				error={errors?.participantOpportunities?.[percentage]?.message}
				format="money"
				name={`participantOpportunities.${percentage}`}
				placeholder={percentage}
				wrapperClassName="mt-6"
				disabled
			/>
			<div className="absolute w-full top-4">
				<div className="">
					<Toggle
						checked={!!participantOpportunities[percentage]}
						checkedClassName="bg-green-500"
						onChecked={(data) => onChange(data.target.checked, percentage)}
					/>
				</div>
			</div>
		</div>
	);
};
