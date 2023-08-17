import { Router } from "@tanstack/router";
import { rootRoute } from "./RootRoute";
import IndexRouter from "./IndexRoute";

//array of all routes
const allRoutes = [...IndexRouter];

const routeTree = rootRoute.addChildren([...allRoutes]);

const router = new Router({ routeTree });

declare module "@tanstack/router" {
	interface Register {
		// This infers the type of our router and registers it across your entire project
		router: typeof router;
	}
}

export { router };
