import { DashboardLayout } from "@/components/layout/Dashboard";
import { AuthenticatedRoute } from "@/routes/routes";
import { Investors } from "../pages/Investors/Investors";
import { Accounting } from "../pages/Accounting/Accounting";

const ManageUserRoute = (route: string): string => {
	return `/manage-users/${route}`;
};

export const NavbarRoutes = [
	{
		path: ManageUserRoute("Investors"),
		page: Investors,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Manage Users",
	},

	{
		path: ManageUserRoute("Accounting"),
		page: Accounting,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Manage Users",
	},
];

const ManageUserRouter = AuthenticatedRoute([...NavbarRoutes]);

export default ManageUserRouter;
