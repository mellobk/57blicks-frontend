import { DashboardLayout } from "@/components/layout/Dashboard";
import { Profile } from "../pages/Profile/Profile.tsx";
import { PermissionPage } from "../pages/Permission/Permission.tsx";

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
