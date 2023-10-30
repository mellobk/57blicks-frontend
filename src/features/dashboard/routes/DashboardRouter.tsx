
import { AuthenticatedRoute } from "@/routes/routes";

import { LLC as ServicingLLC } from "@/features/admin/components/servicing/pages/LLC/LLC";
import { LLC as InvestorPortalsLLC } from "@/features/admin/components/servicing/pages/LLC/LLC";
import { Admin } from "@/features/admin/components/manage-user/pages/Admin/Admin";
import { LoanOverview } from "@/features/admin/components/loan-overview/pages/LoanOverview/LoanOverview";
import { Support } from "@/features/admin/pages/Support/Support";
import { Reporting } from "@/features/admin/pages/Reporting/Reporting";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { CreateOpportunity } from "@/features/admin/components/opportunities/pages/CreateOpportunity/CreateOpportunity";
import { CreateLoan } from "@/features/admin/components/create-loan/pages/CreateLoan/CreateLoan";

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
		page: ServicingLLC,
		layout: DashboardLayout,
		name: "Servicing",
	},
	{
		path: "/investor-portals/dkc-llc",
		page: InvestorPortalsLLC,
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
		name: "Users",
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
