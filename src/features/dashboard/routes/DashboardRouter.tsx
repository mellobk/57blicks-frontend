import { DashboardLayout } from "@/components/layout/Dashboard";
import { CreateLoan } from "@/features/create-loan/pages/CreateLoan/CreateLoan";
import { LoanOverview } from "@/features/loan-overview/pages/LoanOverview/LoanOverview";
import { Admin } from "@/features/manage-user/pages/Admin/Admin";
import { DkcLlc } from "@/features/servicing/pages/DkcLLC/DkcLlc";
import { AuthenticatedRoute } from "@/routes/routes";
import { Reporting } from "../pages/Reporting/Reporting";
import { InvestorPortals } from "../pages/InvestorPortals/InvestorPortals";
import { Opportunities } from "../pages/Opportunities/Opportunities";
import { Support } from "../pages/Support/Support";

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
		path: "/servicing/dkc-llc",
		page: DkcLlc,
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
		path: "/",
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

const DashboardRouter = AuthenticatedRoute([...NavbarRoutes, ...OtherRoutes]);

export default DashboardRouter;
