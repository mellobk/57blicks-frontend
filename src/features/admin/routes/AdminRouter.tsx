import { Admin } from "@/features/admin/components/manage-user/pages/Admin/Admin";
import { AuthenticatedRoute } from "@/routes/routes";
import { CreateLoan } from "@/features/admin/components/create-loan/pages/CreateLoan/CreateLoan";
import { CreateOpportunity } from "@/features/admin/components/opportunities/pages/CreateOpportunity/CreateOpportunity";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { LLC as InvestorPortalsLLC } from "@/features/admin/components/investor-portals/pages/LLC/LLC";
import { InvestorPortalsRoutes } from "@/features/admin/components/investor-portals/routes/InvestorPortalsRoutes";
import { LoanOverview } from "@/features/admin/components/loan-overview/pages/LoanOverview/LoanOverview";
import { ManageUserRoutes } from "@/features/admin/components/manage-user/routes/ManageUsersRoutes";
import { OpportunitiesRoutes } from "@/features/admin/components/opportunities/routes/OpportunitiesRoutes";
import PreviewInvoice from "../components/servicing/component/Invoice/Components/PreviewInvoice";
import { ProfileRoutes } from "@/features/admin/components/profile/routes/ProfileRoutes";
import { Reports } from "@/features/admin/components/reports/pages/Reports";
import { LLC as ServicingLLC } from "@/features/admin/components/servicing/pages/LLC/LLC";
import { ServicingRoutes } from "@/features/admin/components/servicing/routes/ServicingRoutes";
import { Support } from "@/features/admin/pages/Support/Support";

export const NavbarRoutes = [
	{
		path: "/reporting",
		page: Reports,
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
		path: "/invoice-preview",
		page: PreviewInvoice,
		layout: DashboardLayout,
		name: "invoice-preview",
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

const AdminRouter = AuthenticatedRoute([
	...NavbarRoutes,
	...OtherRoutes,
	...InvestorPortalsRoutes,
	...ManageUserRoutes,
	...OpportunitiesRoutes,
	...ServicingRoutes,
	...ProfileRoutes,
]);

export const NavbarData = {
	report: {
		path: "/reporting",
		page: Reports,
		layout: DashboardLayout,
		name: "Reporting",
	},
	loanOverview: {
		path: "/loan-overview",
		page: LoanOverview,
		layout: DashboardLayout,
		name: "Loan Overview",
	},
	servicing: {
		path: "/servicing/dkc-llc",
		page: ServicingLLC,
		layout: DashboardLayout,
		name: "Servicing",
	},
	investorPortal: {
		path: "/investor-portals/dkc-llc",
		page: InvestorPortalsLLC,
		layout: DashboardLayout,
		name: "Investor Portals",
	},
	opportunities: {
		path: "/opportunities/create-opportunity",
		page: CreateOpportunity,
		layout: DashboardLayout,
		name: "Opportunities",
	},
	users: {
		path: "/manage-users/admins",
		page: Admin,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Users",
	},
	support: {
		path: "/support",
		page: Support,
		layout: DashboardLayout,
		name: "Support",
	},
	empty: {
		path: "",
		page: null,
		layout: DashboardLayout,
		name: "",
	},
};

export default AdminRouter;
