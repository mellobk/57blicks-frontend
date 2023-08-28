import { Router } from "@tanstack/router";
import { rootRoute } from "./RootRoute";
import IndexRouter from "./IndexRouter.tsx";
import LoginRouter from "@/features/auth/routes/LoginRouter.tsx";
import DashboardRouter from "@/features/dashboard/routes/DashboardRouter.tsx";

//array of all routes
const allRoutes = [...IndexRouter, ...LoginRouter, ...DashboardRouter];

const routeTree = rootRoute.addChildren([...allRoutes]);

const router = new Router({ routeTree });

declare module "@tanstack/router" {
	interface Register {
		// This infers the type of our router and registers it across your entire project
		router: typeof router;
	}
}

export { router };
