import type { ComponentType, ReactElement, ReactNode } from "react";
import { Route } from "@tanstack/router";
import { rootRoute } from "./RootRoute";

interface Props {
	path: string;
	page: ComponentType;
	layout?: ComponentType<{ children: ReactNode }> | null;
}

const UnauthenticatedRoute = (routes: Array<Props>) => {
	return routes.map(({ page: Page, layout: Layout, path }) => {
		return new Route({
			path,
			getParentRoute: (): typeof rootRoute => rootRoute,
			component: (): ReactElement => {
				return Layout ? (
					<Layout>
						<Page />
					</Layout>
				) : (
					<Page />
				);
			},
		});
	});
};

export default UnauthenticatedRoute;
