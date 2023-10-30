import type { ComponentType, ReactElement, ReactNode } from "react";
import { Route } from "@tanstack/router";
import { RootRoute } from "./RootRoute";
import { getLocalStorage, removeLocalStorage } from "@/utils/local-storage";
import { accessToken, group } from "@/utils/constant";
import { signOut } from "@/lib/cognito";
import {
	awsRouterPermission,
	investorRouterPermission,
} from "@/utils/router-funtions";

interface Props {
	path: string;
	page: ComponentType;
	layout?: ComponentType<{ children: ReactNode }> | null;
}

const UnauthenticatedRoute = (routes: Array<Props>) => {
	return routes.map(({ page: Page, layout: Layout, path }) => {
		return new Route({
			path,
			getParentRoute: (): typeof RootRoute => RootRoute,
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
			getParentRoute: (): typeof RootRoute => RootRoute,
			component: (): ReactElement => {
				const cognitoGroup = getLocalStorage(group)
					? JSON?.parse(getLocalStorage(group))
					: "";
				if (!getLocalStorage(accessToken)) {
					signOut();
					removeLocalStorage(accessToken);
					window.location.href = "/login";
				}

				awsRouterPermission(cognitoGroup as string);

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

export const InvestorRoute = (routes: Array<Props>) => {
	return routes.map(({ page: Page, layout: Layout, path }) => {
		return new Route({
			path,
			getParentRoute: (): typeof RootRoute => RootRoute,
			component: (): ReactElement => {
				if (!getLocalStorage(accessToken)) {
					signOut();
					removeLocalStorage(accessToken);
					window.location.href = "/login";
				}

				const cognitoGroup = getLocalStorage(group)
					? JSON?.parse(getLocalStorage(group))
					: "";

				investorRouterPermission(cognitoGroup as string);

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
