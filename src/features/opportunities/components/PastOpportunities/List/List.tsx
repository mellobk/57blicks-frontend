import type { FC } from "react";
import { Name } from "@/features/opportunities/components/PastOpportunities/Name/Name";
import type { OpportunityMin } from "@/features/opportunities/types/api";

interface Props {
	data?: Array<OpportunityMin>;
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
			<Name
				filename={getFilename(opportunity.referenceId)}
				selected={selectedOpportunity?.id === opportunity.id}
			/>
		</div>
	));
