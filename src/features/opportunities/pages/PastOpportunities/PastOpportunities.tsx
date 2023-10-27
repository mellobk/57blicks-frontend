import { type FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { BreadCrumb } from "@/components/ui/BreadCrumb";
import { Loading } from "@/components/ui/Loading";
import { Tabs } from "@/components/ui/Tabs";
import OpportunitiesService from "@/api/opportunities.ts";
import { Details } from "@/features/opportunities/components/PastOpportunities/Details/Details";
import { DocumentPreview } from "@/features/opportunities/components/PastOpportunities/DocumentPreview/DocumentPreview";
import { List } from "@/features/opportunities/components/PastOpportunities/List/List";
import { tabs } from "@/features/opportunities/utils/tabs";
import { OpportunityMin } from "@/types/api/opportunityMin";

export const PastOpportunities: FC = () => {
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

	const getFilename = (referenceId: number) => {
		return `DKC_Opportunity_${referenceId}.pdf`;
	};

	useEffect(() => {
		setSelectedOpportunity(getOpportunitiesQuery?.data?.[0]);
	}, [getOpportunitiesQuery?.data]);

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex justify-between items-center w-full bg-primary-500 px-4 mb-2">
				<div>
					<BreadCrumb
						initialTab="Opportunities"
						actualTab="Past Opportunities"
					/>
				</div>
				<div className="relative z-10">
					<Tabs tabs={tabs} actualTab="past opportunities" />
				</div>
				<div></div>
			</div>

			<div className="flex bg-white rounded-3xl p-6 w-screen h-full">
				{getOpportunitiesQuery.isLoading ? (
					<Loading />
				) : (
					<div className="grid lg:grid-cols-9 gap-6 w-full">
						<div className="lg:col-span-2 col-span-1 flex flex-col gap-6 p-3 bg-gold-300 overflow-y-auto">
							<List
								data={getOpportunitiesQuery.data}
								getFilename={getFilename}
								selectedOpportunity={selectedOpportunity}
								setSelectedOpportunity={setSelectedOpportunity}
							/>
						</div>
						{selectedOpportunity && (
							<>
								<div className="lg:col-span-4 col-span-1 flex flex-col gap-8 py-2">
									<Details
										data={getOpportunityQuery.data}
										getFilename={getFilename}
										isLoading={getOpportunityQuery.isLoading}
									/>
								</div>
								<div className="lg:col-span-3 col-span-1">
									<DocumentPreview
										isLoading={getOpportunityQuery.isLoading}
										url={getOpportunityQuery.data?.presignedDocumentUrl}
									/>
								</div>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
