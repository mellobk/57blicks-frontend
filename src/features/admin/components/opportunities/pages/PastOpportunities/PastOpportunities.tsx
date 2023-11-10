/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import OpportunitiesService from "@/api/opportunities";
import { BreadCrumb } from "@/components/ui/BreadCrumb";
import { Loading } from "@/components/ui/Loading";
import { OpportunityList } from "@/components/ui/OpportunityList";
import { Tabs } from "@/components/ui/Tabs";
import { Details } from "@/features/admin/components/opportunities/components/PastOpportunities/Details/Details";
import { DocumentPreview } from "@/features/admin/components/opportunities/components/PastOpportunities/DocumentPreview/DocumentPreview";
import type { OpportunityMin } from "@/types/api/opportunity-min";
import userStore from "@/stores/user-store";
import { findPermission } from "@/utils/common-funtions";
import { PermissionType } from "@/types/api/permissions-type";
import { tabsOpportunity } from "../../utils/tabs";


const getFilename = (referenceId: number): string => {
	return `DKC_Opportunity_${referenceId}.pdf`;
};

export const PastOpportunities: FC = () => {
	const userLoggedInfo = userStore((state) => state.loggedUserInfo);
	const idQueryParameter = new URLSearchParams(window.location.search);
	const id = idQueryParameter.get("id");

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
		const getOpportunityBYId = getOpportunitiesQuery?.data?.find(
			(data) => data.id === id
		);

		setSelectedOpportunity(
			getOpportunityBYId || getOpportunitiesQuery?.data?.[0] || {}
		);
	}, [getOpportunitiesQuery?.data, id]);

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
					<Tabs
						tabs={[
							findPermission(
								userLoggedInfo?.role,
								userLoggedInfo?.permissionGroup?.permissions || [],
								PermissionType.CREATE_OPPORTUNITY
							)
								? tabsOpportunity.create
								: tabsOpportunity.empty,

							findPermission(
								userLoggedInfo?.role,
								userLoggedInfo?.permissionGroup?.permissions || [],
								PermissionType.VIEW_OPPORTUNITIES
							)
								? tabsOpportunity.past
								: tabsOpportunity.empty,
						]}
						actualTab="past opportunities"
					/>
				</div>
				<div></div>
			</div>

			<div className="flex bg-white rounded-3xl p-6 w-screen h-full">
				{getOpportunitiesQuery.isLoading ? (
					<Loading />
				) : (
					<div className="grid lg:grid-cols-9 gap-6 w-full">
						<div className="lg:col-span-2 col-span-1 flex flex-col gap-6 p-3 bg-gold-300 overflow-y-auto">
							<OpportunityList
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
