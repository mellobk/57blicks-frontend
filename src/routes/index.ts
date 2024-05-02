import { Router } from "@tanstack/router";

import AuthRouter from "@/features/auth/routes/AuthRouter";
import AppRouter from "./AppRouter";
import { RootRoute } from "./RootRoute";
import HomeRouter from "@/features/home/routes/homeRouter";

//array of all routes
const allRoutes = [...AppRouter, ...AuthRouter, ...HomeRouter];

const routeTree = RootRoute.addChildren([...allRoutes]);

const router = new Router({ routeTree });

declare module "@tanstack/router" {
	interface Register {
		// This infers the type of our router and registers it across your entire project
		router: typeof router;
	}
}

export { router };
