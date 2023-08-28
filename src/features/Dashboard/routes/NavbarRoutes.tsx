import { DashboardLayout } from "@/components/layout/Dashboard";
import { CreateLoan } from "@/features/Dashboard/pages/CreateLoan/CreateLoan";

import UnauthenticatedRoute from "@/routes/routes";
import { Reporting } from "../pages/Reporting/Reporting";
import { LoanOverview } from "../pages/LoanOverview/LoanOverview";
import { Servicing } from "../pages/Servicing/Servicing";
import { InvestorPortals } from "../pages/InvestorPortals/InvestorPortals";
import { Opportunities } from "../pages/Opportunities/Opportunities";
import { ManageUsers } from "../pages/ManageUsers/ManageUsers";
import { Support } from "../pages/Support/Support";

export const NavbarRoutes = [
	{
		path: "/reporting",
		page: Reporting,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Reporting",
	},
	{
		path: "/loan-overview",
		page: LoanOverview,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Loan Overview",
	},
	{
		path: "/servicing",
		page: Servicing,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Servicing",
	},
	{
		path: "/investor-portals",
		page: InvestorPortals,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Investor Portals",
	},
	{
		path: "/opportunities",
		page: Opportunities,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Opportunities",
	},
	{
		path: "/manage-users",
		page: ManageUsers,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Manage Users",
	},
	{
		path: "/support",
		page: Support,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Support",
	},
];

const OtherRoutes = [
	{
		path: "/create-loan",
		page: CreateLoan,
		routeComponent: null,
		layout: DashboardLayout,
	},
];

const DashboardRouter = UnauthenticatedRoute([...NavbarRoutes, ...OtherRoutes]);

export default DashboardRouter;
