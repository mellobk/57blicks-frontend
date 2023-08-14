import { Route } from "@tanstack/router";
import {LoginLayout} from "../components/layout/Login/Login";
import { rootRoute } from "./RootRoute";

export const IndexRoute = new Route({
	getParentRoute: (): typeof rootRoute => rootRoute,
	path: "/",
	component: LoginLayout,
});
