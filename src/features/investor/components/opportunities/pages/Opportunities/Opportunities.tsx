import { type FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import OpportunitiesService from "@/api/opportunities";
import { Loading } from "@/components/ui/Loading";
import { DocumentPreview } from "@/features/investor/components/opportunities/components/DocumentPreview/DocumentPreview";
import { OpportunityList } from "@/components/ui/OpportunityList/OpportunityList.tsx";
import type { OpportunityMin } from "@/types/api/opportunity-min";

const getFilename = (referenceId: number):string => {
	return `DKC_Opportunity_${referenceId}.pdf`;
};

export const Opportunities: FC = () => {
	const [selectedOpportunity, setSelectedOpportunity] =
		useState<OpportunityMin>();

	const getOpportunitiesQuery = useQuery(
		["opportunities-query"],
		() => OpportunitiesService.getOpportunities(),
		{ enabled: !selectedOpportunity }
	);

	const getOpportunityQuery = useQuery(
		["opportunity-query", selectedOpportunity?.id],
		() => OpportunitiesService.getOpportunity(selectedOpportunity?.id),
		{ enabled: !!selectedOpportunity?.id }
	);

	useEffect(() => {
		setSelectedOpportunity(getOpportunitiesQuery?.data?.[0]);
	}, [getOpportunitiesQuery?.data]);

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex bg-white rounded-3xl p-6 w-screen h-full">
				{getOpportunitiesQuery.isLoading ? (
					<Loading />
				) : (
					<div className="grid lg:grid-cols-12 gap-6 w-full">
						<div className="lg:col-span-5 col-span-1 flex flex-col gap-6 p-3 bg-gold-300 overflow-y-auto">
							<OpportunityList
								data={getOpportunitiesQuery.data}
								getFilename={getFilename}
								selectedOpportunity={selectedOpportunity}
								setSelectedOpportunity={setSelectedOpportunity}
							/>
						</div>
						<div className="lg:col-span-7 col-span-1 flex flex-col gap-8 py-2">
							<DocumentPreview
								data={getOpportunityQuery.data}
								getFilename={getFilename}
								isLoading={getOpportunityQuery.isLoading}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
