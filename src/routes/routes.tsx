import type { ComponentType, ReactElement, ReactNode } from "react";
import { Route } from "@tanstack/router";
import { rootRoute } from "./RootRoute";
import { getLocalStorage, removeLocalStorage } from "@/utils/local-storage";
import { accessToken } from "@/utils/constant";
import { signOut } from "@/lib/cognito";

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

export const AuthenticatedRoute = (routes: Array<Props>) => {
	return routes.map(({ page: Page, layout: Layout, path }) => {
		return new Route({
			path,
			getParentRoute: (): typeof rootRoute => rootRoute,
			component: (): ReactElement => {
				if (!getLocalStorage(accessToken)) {
					signOut();
					removeLocalStorage(accessToken);
					window.location.href = "/login";
				}

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
