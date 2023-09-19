import { Router } from "@tanstack/router";
import { rootRoute } from "./RootRoute";
import IndexRouter from "./IndexRouter";
import DashboardRouter from "@/features/dashboard/routes/DashboardRouter";
import ManageUserRouter from "@/features/manage-user/routes/ManageUsersRouter";
import LoginRouter from "@/features/auth/routes/LoginRouter";
import ServicingRouter from "@/features/servicing/routes/ServicingRoutes";
import ProfileRouter from "@/features/profile/routes/ProfileRoutes";

//array of all routes
const allRoutes = [
	...IndexRouter,
	...LoginRouter,
	...DashboardRouter,
	...ManageUserRouter,
	...ServicingRouter,
	...ProfileRouter,
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
