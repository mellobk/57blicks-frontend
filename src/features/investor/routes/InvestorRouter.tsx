import { BlankLayout } from "@/components/layout/BlankLayout";
import { Portfolio } from "@/features/investor/components/portfolio/pages/Portfolio/Portfolio";
import { InvestorRoute } from "@/routes/routes";

export const InvestorRoutes = [
	{
		path: "/investors/portfolio",
		page: Portfolio,
		layout: BlankLayout,
	},
];

const InvestorRouter = InvestorRoute([...InvestorRoutes]);

export default InvestorRouter;
