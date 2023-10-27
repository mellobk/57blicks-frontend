import { InvestorRoute } from "@/routes/routes";
import { HomeInvestor } from "../pages/Home/Home";
import { BlankLayout } from "@/components/layout/BlankLayout";

export const InvestorRoutes = [
	{
		path: "/investors",
		page: HomeInvestor,
		layout: BlankLayout,
	},
	{
		path: "/investors/portfolio",
		page: HomeInvestor,
		layout: BlankLayout,
	},
];

const InvestorRouter = InvestorRoute([...InvestorRoutes]);

export default InvestorRouter;
