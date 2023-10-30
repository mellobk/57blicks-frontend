import { DashboardLayout } from "@/components/layout/Dashboard";
import { Profile } from "../pages/Profile/Profile";
import { PermissionPage } from "../pages/Permission/Permission";

export const ProfileRoutes = [
	{
		path: "/profile",
		page: Profile,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Manage Users",
	},
	{
		path: "/permissions",
		page: PermissionPage,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Manage Users",
	},
];
