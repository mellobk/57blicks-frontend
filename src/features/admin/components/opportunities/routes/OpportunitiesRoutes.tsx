import { DashboardLayout } from "@/components/layout/Dashboard";
import { PastOpportunities } from "@/features/admin/components/opportunities/pages/PastOpportunities/PastOpportunities.tsx";

export const OpportunitiesRoutes = [
	{
		path: "/opportunities/past-opportunities",
		page: PastOpportunities,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Past Opportunities",
	},
];
