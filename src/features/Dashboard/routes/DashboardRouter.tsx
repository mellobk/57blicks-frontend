import { DashboardLayout } from "@/components/layout/Dashboard";
import { CreateLoan } from "@/pages/Dashboard/CreateLoan/CreateLoan.tsx";
import { InvestorPortals } from "@/pages/Dashboard/InvestorPortals/InvestorPortals.tsx";
import { LoanOverview } from "@/pages/Dashboard/LoanOverview/LoanOverview.tsx";
import { ManageUsers } from "@/pages/Dashboard/ManageUsers/ManageUsers.tsx";
import { Opportunities } from "@/pages/Dashboard/Opportunities/Opportunities.tsx";
import { Reporting } from "@/pages/Dashboard/Reporting/Reporting.tsx";
import { Servicing } from "@/pages/Dashboard/Servicing/Servicing.tsx";
import { Support } from "@/pages/Dashboard/Support/Support.tsx";
import UnauthenticatedRoute from "@/routes/routes";

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
