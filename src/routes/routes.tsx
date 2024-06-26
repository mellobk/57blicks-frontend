/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
	layout?: ComponentType<{ children: ReactNode; hScreen?: string }> | null;
	className?: string;
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
	return routes.map(({ page: Page, layout: Layout, path, className }) => {
		return new Route({
			path,
			getParentRoute: (): typeof RootRoute => RootRoute,
			component: (): ReactElement => {
				if (!getLocalStorage(accessToken)) {
					signOut();
					removeLocalStorage(accessToken);
					window.location.href = "/login";
				}

				return Layout ? (
					<Layout hScreen={className}>
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
