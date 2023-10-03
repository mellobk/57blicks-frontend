import { Admin } from "@/features/manage-user/pages/Admin/Admin";
import { AuthenticatedRoute } from "@/routes/routes";
import { CreateLoan } from "@/features/create-loan/pages/CreateLoan/CreateLoan";
import { CreateOpportunity } from "@/features/opportunities/pages/CreateOpportunity/CreateOpportunity";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { DkcLlc } from "@/features/servicing/pages/DkcLLC/DkcLlc";
import { ForbiddenPage } from "@/features/auth/pages/forbidden/ForbiddenPage";
import { InvestorPortals } from "../pages/InvestorPortals/InvestorPortals";
import { LoanOverview } from "@/features/loan-overview/pages/LoanOverview/LoanOverview";
import { Reporting } from "../pages/Reporting/Reporting";
import { Support } from "../pages/Support/Support";

export const NavbarRoutes = [
	{
		path: "/",
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
		path: "/opportunities/create-opportunity",
		page: CreateOpportunity,
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
	{
		path: "/403",
		page: ForbiddenPage,
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
