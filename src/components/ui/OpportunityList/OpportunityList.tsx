import type { FC } from "react";

import { OpportunityName } from "@/components/ui/OpportunityName";
import type { OpportunityMin } from "@/types/api/opportunity-min";

interface Props {
	data?: Array<OpportunityMin>;
	getFilename: (referenceId: number) => string;
	selectedOpportunity?: OpportunityMin;
	setSelectedOpportunity: (selectedOpportunity?: OpportunityMin) => void;
}

export const OpportunityList: FC<Props> = ({
	data,
	getFilename,
	selectedOpportunity,
	setSelectedOpportunity,
}) =>
	data?.map((opportunity, key) => (
		<div
			className={`${
				selectedOpportunity?.id === opportunity.id
					? "bg-gold-500/[.12]"
					: "bg-white"
			} p-4 rounded-lg cursor-pointer`}
			key={key}
			onClick={() => {
				setSelectedOpportunity(opportunity);
			}}
		>
			<OpportunityName
				filename={getFilename(opportunity.referenceId || 0)}
				selected={selectedOpportunity?.id === opportunity.id}
			/>
		</div>
	));
