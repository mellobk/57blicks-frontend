import { ReactElement } from "react";
import { Outlet, RootRoute } from "@tanstack/router";

export const rootRoute = new RootRoute({
	component: (): ReactElement => <Outlet />,
});
