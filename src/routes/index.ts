import {Router} from "@tanstack/router";
import {rootRoute} from "./RootRoute";
import LoginRouter from "@/features/auth/routes/LoginRouter";
import DashboardRouter from "@/features/dashboard/routes/DashboardRouter";
import ManageUserRouter from "@/features/manage-user/routes/ManageUsersRouter";
import OpportunitiesRouter from "@/features/opportunities/routes/OpportunitiesRouter";
import ServicingRouter from "@/features/servicing/routes/ServicingRoutes";
import ProfileRouter from "@/features/profile/routes/ProfileRoutes";
import appRouter from "./appRoutes";
import investorRouter from "@/features/investor/routes/investorRouter";

//array of all routes
const allRoutes = [
	...LoginRouter,
	...DashboardRouter,
	...ManageUserRouter,
	...OpportunitiesRouter,
	...ServicingRouter,
	...ProfileRouter,
	...appRouter,
	...investorRouter,
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
