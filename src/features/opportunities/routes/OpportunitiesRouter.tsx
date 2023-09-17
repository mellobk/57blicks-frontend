import { DashboardLayout } from "@/components/layout/Dashboard";
import { PastOpportunities } from "@/features/opportunities/pages/PastOpportunities/PastOpportunities";
import UnauthenticatedRoute from "@/routes/routes";

export const NavbarRoutes = [
	{
		path: "/opportunities/past-opportunities",
		page: PastOpportunities,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Past Opportunities",
	},
];

const OpportunitiesRouter = UnauthenticatedRoute([...NavbarRoutes]);

export default OpportunitiesRouter;
