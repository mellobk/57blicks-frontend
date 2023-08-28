import { Router } from "@tanstack/router";
import { rootRoute } from "./RootRoute";
import IndexRouter from "./IndexRoute";
import LoginRouter from "@/features/Login/routes/LoginRoutes";
import DashboardRouter from "@/features/Dashboard/routes/NavbarRoutes.tsx";

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
