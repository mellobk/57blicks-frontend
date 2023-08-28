import { DashboardLayout } from "@/components/layout/Dashboard";
import { CreateLoan } from "@/features/Dashboard/pages/CreateLoan/CreateLoan";

import UnauthenticatedRoute from "@/routes/routes";
import { Reporting } from "../pages/Reporting/Reporting";
import { LoanOverview } from "../pages/LoanOverview/LoanOverview";
import { Servicing } from "../pages/Servicing/Servicing";
import { InvestorPortals } from "../pages/InvestorPortals/InvestorPortals";
import { Opportunities } from "../pages/Opportunities/Opportunities";
import { Support } from "../pages/Support/Support";
import { Admin } from "@/features/ManageUser/pages/Admin/Admin";

export const NavbarRoutes = [
	{
		path: "/reporting",
		page: Reporting,
		layout: DashboardLayout,
		name: "Reporting",
	},
	{
		path: "/loan-overview",
		page: LoanOverview,
		layout: DashboardLayout,
		name: "Loan Overview",
	},
	{
		path: "/servicing",
		page: Servicing,
		layout: DashboardLayout,
		name: "Servicing",
	},
	{
		path: "/investor-portals",
		page: InvestorPortals,
		layout: DashboardLayout,
		name: "Investor Portals",
	},
	{
		path: "/opportunities",
		page: Opportunities,
		layout: DashboardLayout,
		name: "Opportunities",
	},
	{
		path: "/manage-users/admins",
		page: Admin,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Manage Users",
	},
	{
		path: "/support",
		page: Support,
		layout: DashboardLayout,
		name: "Support",
	},
];

const OtherRoutes = [
	{
		path: "/create-loan",
		page: CreateLoan,
		layout: DashboardLayout,
	},
];

const DashboardRouter = UnauthenticatedRoute([...NavbarRoutes, ...OtherRoutes]);

export default DashboardRouter;
