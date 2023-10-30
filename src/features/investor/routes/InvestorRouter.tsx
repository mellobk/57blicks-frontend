import { BlankLayout } from "@/components/layout/BlankLayout";
import { Opportunities } from "@/features/investor/components/opportunities/pages/Opportunities/Opportunities";
import { Portfolio } from "@/features/investor/components/portfolio/pages/Portfolio/Portfolio";
import { InvestorRoute } from "@/routes/routes";

export const InvestorRoutes = [
	{
		path: "/investors/portfolio",
		page: Portfolio,
		layout: BlankLayout,
	},
	{
		path: "/investors/opportunities",
		page: Opportunities,
		layout: BlankLayout,
	},
];

const InvestorRouter = InvestorRoute([...InvestorRoutes]);

export default InvestorRouter;
