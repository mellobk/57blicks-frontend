import { Router } from "@tanstack/router";
import LoginRouter from "@/features/auth/routes/LoginRouter";
import DashboardRouter from "@/features/dashboard/routes/DashboardRouter";
import InvestorPortalsRouter from "@/features/investor-portals/routes/InvestorPortalsRoutes";
import InvestorRouter from "@/features/investor/routes/InvestorRouter";
import ManageUserRouter from "@/features/manage-user/routes/ManageUsersRouter";
import OpportunitiesRouter from "@/features/opportunities/routes/OpportunitiesRouter";
import ProfileRouter from "@/features/profile/routes/ProfileRoutes";
import ServicingRouter from "@/features/servicing/routes/ServicingRoutes";
import { rootRoute } from "./RootRoute";
import AppRouter from "./AppRoutes";

//array of all routes
const allRoutes = [
  ...AppRouter,
  ...DashboardRouter,
  ...InvestorRouter,
  ...InvestorPortalsRouter,
  ...LoginRouter,
  ...ManageUserRouter,
  ...OpportunitiesRouter,
  ...ProfileRouter,
  ...ServicingRouter,
];

const routeTree = rootRoute.addChildren([...allRoutes]);

const router = new Router({ routeTree });

declare module "@tanstack/router" {
	interface Register {
		// This infers the type of our router and registers it across your entire project
		router: typeof router;
	}
}

export { router };
