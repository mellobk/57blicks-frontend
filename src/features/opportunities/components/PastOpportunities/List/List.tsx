import type { FC } from "react";
import { Name } from "@/features/opportunities/components/PastOpportunities/Name/Name";
import { OpportunityMin } from "@/features/opportunities/types/api.ts";

interface Props {
	data?: OpportunityMin[];
	getFilename: (referenceId: number) => string;
	selectedOpportunity?: OpportunityMin;
	setSelectedOpportunity: (selectedOpportunity?: OpportunityMin) => void;
}

export const List: FC<Props> = ({
	data,
	getFilename,
	selectedOpportunity,
	setSelectedOpportunity,
}) =>
	data?.map((opportunity) => (
		<div
			className={`${
				selectedOpportunity?.id === opportunity.id
					? "bg-gold-500/[.12]"
					: "bg-white"
			} p-4 rounded-lg cursor-pointer`}
			onClick={() => setSelectedOpportunity(opportunity)}
		>
			<Name
				filename={getFilename(opportunity.referenceId)}
				selected={selectedOpportunity?.id === opportunity.id}
			/>
		</div>
	));
