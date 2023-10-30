import { DashboardLayout } from "@/components/layout/Dashboard";
import { CreateLoan } from "@/features/admin/components/create-loan/pages/CreateLoan/CreateLoan";
import { CreateOpportunity } from "@/features/admin/components/opportunities/pages/CreateOpportunity/CreateOpportunity";
import { LLC as ServicingLLC } from "@/features/admin/components/servicing/pages/LLC/LLC";
import { LLC as InvestorPortalsLLC } from "@/features/admin/components/investor-portals/pages/LLC/LLC";
import { LoanOverview } from "@/features/admin/components/loan-overview/pages/LoanOverview/LoanOverview";
import { Reporting } from "@/features/admin/pages/Reporting/Reporting";
import { Support } from "@/features/admin/pages/Support/Support";
import { AuthenticatedRoute } from "@/routes/routes";
import { InvestorPortalsRoutes } from "@/features/admin/components/investor-portals/routes/InvestorPortalsRoutes";
import { ManageUserRoutes } from "@/features/admin/components/manage-user/routes/ManageUsersRoutes";
import { OpportunitiesRoutes } from "@/features/admin/components/opportunities/routes/OpportunitiesRoutes";
import { ServicingRoutes } from "@/features/admin/components/servicing/routes/ServicingRoutes";
import { ProfileRoutes } from "@/features/admin/components/profile/routes/ProfileRoutes";
import { Admin } from "@/features/admin/components/manage-user/pages/Admin/Admin";

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

const AdminRouter = AuthenticatedRoute([
	...NavbarRoutes,
	...OtherRoutes,
	...InvestorPortalsRoutes,
	...ManageUserRoutes,
	...OpportunitiesRoutes,
	...ServicingRoutes,
	...ProfileRoutes,
]);

export default AdminRouter;
