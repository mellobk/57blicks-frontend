import { InvestorRoute } from "@/routes/routes";
import { HomeInvestor } from "../pages/Home/Home";
import { BlankLayout } from "@/components/layout/BlankLayout";

export const investorRoutes = [
	{
		path: "/investors",
		page: HomeInvestor,
		layout: BlankLayout,
	},
];

const investorRouter = InvestorRoute([...investorRoutes]);

export default investorRouter;
