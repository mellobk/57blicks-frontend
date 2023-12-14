import { InvestorLayout } from "@/components/layout/InvestorLayout";
import { Opportunities } from "@/features/investor/components/opportunities/pages/Opportunities/Opportunities";
import { Portfolio } from "@/features/investor/components/portfolio/pages/Portfolio/Portfolio";
import { InvestorRoute } from "@/routes/routes";
import { Support } from "@/features/investor/components/support/Support";
import { Faq } from "@/features/investor/components/faq/Faq";
import { Profile } from "@/features/admin/components/profile/pages/Profile/Profile";
import { Reports } from "@/features/admin/components/reports/pages/Reports";

export const InvestorRoutes = [
	{
		path: "/investors/reporting",
		page: Reports,
		layout: InvestorLayout,
		name: "Reporting",
	},
	{
		path: "/investors/portfolio",
		page: Portfolio,
		layout: InvestorLayout,
		name: "Portfolio",
	},
	{
		path: "/investors/opportunities",
		page: Opportunities,
		layout: InvestorLayout,
		name: "Opportunities",
	},
	{
		path: "/investors/support",
		page: Support,
		layout: InvestorLayout,
		name: "Support",
	},
	{
		path: "/investors/faq",
		page: Faq,
		layout: InvestorLayout,
		name: "",
	},
];

const profileRoutes = [
	{
		path: "/investors/Profile",
		page: Profile,
		routeComponent: null,
		layout: InvestorLayout,
		name: "Manage Users",
	},
];

const InvestorRouter = InvestorRoute([...InvestorRoutes, ...profileRoutes]);

export default InvestorRouter;
