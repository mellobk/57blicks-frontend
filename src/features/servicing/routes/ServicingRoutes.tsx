import UnauthenticatedRoute from "@/routes/routes";
import { DkcFl } from "../pages/DkcFlc/DkcFl";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { FirstCapital } from "../pages/FirstCapital/FirstCapital";
import { DkcIv } from "../pages/DkcIv/DkcIv";
import { DkcCl } from "../pages/DkcCl/DkcCl";

const ServicingRoutes = [
	{
		path: "/servicing/dkc-fl",
		page: DkcFl,
		layout: DashboardLayout,
	},
	{
		path: "/servicing/dkc-cl",
		page: DkcCl,
		layout: DashboardLayout,
	},
	{
		path: "/servicing/dkc-iv",
		page: DkcIv,
		layout: DashboardLayout,
	},
	{
		path: "/servicing/first-capital",
		page: FirstCapital,
		layout: DashboardLayout,
	},
];

const ServicingRouter = UnauthenticatedRoute(ServicingRoutes);

export default ServicingRouter;
