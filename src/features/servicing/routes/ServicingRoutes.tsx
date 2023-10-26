import UnauthenticatedRoute from "@/routes/routes";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { CL } from "@/features/servicing/pages/CL/CL";
import { FirstCapital } from "@/features/servicing/pages/FirstCapital/FirstCapital";
import { FL } from "@/features/servicing/pages/FL/FL";
import { IV } from "@/features/servicing/pages/IV/IV";

const ServicingRoutes = [
	{
		path: "/servicing/dkc-fl",
		page: FL,
		layout: DashboardLayout,
	},
	{
		path: "/servicing/dkc-cl",
		page: CL,
		layout: DashboardLayout,
	},
	{
		path: "/servicing/dkc-iv",
		page: IV,
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
