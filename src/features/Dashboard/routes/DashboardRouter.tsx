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
		path: "/manage-users",
		page: ManageUsers,
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
