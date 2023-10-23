import { DashboardLayout } from "@/components/layout/Dashboard";
import { AuthenticatedRoute } from "@/routes/routes";
import { Profile } from "../pages/Profile/Profile";
import { PermissionPage } from "../pages/Permission/Permission";

export const ProfileRoute = [
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

const ProfileRouter = AuthenticatedRoute([...ProfileRoute]);

export default ProfileRouter;
