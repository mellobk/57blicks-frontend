import type { ComponentType, ReactElement } from "react";
import { Route } from "@tanstack/router";
import { rootRoute } from "./RootRoute";

interface Props {
	path?: string;
	page?: ComponentType;
	layout: ComponentType | any;
}

const UnauthenticatedRoute = (Routes: Array<Props>) => {
	return Routes.map(({ page: C, layout: Layout, path }) => {
		return new Route({
			getParentRoute: (): typeof rootRoute => rootRoute,
			path: path || "/",

			component: (): ReactElement => {
				return Layout ? (
					<Layout>{C ? <C /> : null}</Layout>
				) : (
					<div>{C ? <C /> : null}</div>
				);
			},
		});
	});
};

export default UnauthenticatedRoute;
