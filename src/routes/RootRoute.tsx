import { ReactElement } from "react";
import { Outlet, RootRoute as TanstackRootRoute } from "@tanstack/router";

export const RootRoute = new TanstackRootRoute({
	component: (): ReactElement => <Outlet />,
});
