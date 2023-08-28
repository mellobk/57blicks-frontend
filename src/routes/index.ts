import { Router } from "@tanstack/router";
import { rootRoute } from "./RootRoute";
import IndexRouter from "./IndexRouter.tsx";
import DashboardRouter from "@/features/Dashboard/routes/DashboardRouter.tsx";
import ManageUSerRouter from "@/features/ManageUser/routes/ManageUsersRoutes.tsx";
import LoginRouter from "@/features/auth/routes/LoginRouter.tsx";

//array of all routes
const allRoutes = [
	...IndexRouter,
	...LoginRouter,
	...DashboardRouter,
	...ManageUSerRouter,
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
