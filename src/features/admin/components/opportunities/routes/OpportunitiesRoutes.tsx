import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PastOpportunities } from "@/features/admin/components/opportunities/pages/PastOpportunities/PastOpportunities";

export const OpportunitiesRoutes = [
	{
		path: "/opportunities/past-opportunities",
		page: PastOpportunities,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Past Opportunities",
	},
];
