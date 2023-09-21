import { DashboardLayout } from "@/components/layout/Dashboard";
import { AuthenticatedRoute } from "@/routes/routes";
import { Profile } from "../pages/Profile/Profile";

export const ProfileRoute = [
	{
		path: "/profile",
		page: Profile,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Manage Users",
	},
];

const ProfileRouter = AuthenticatedRoute([...ProfileRoute]);

export default ProfileRouter;
