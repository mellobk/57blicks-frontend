import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Accounting } from "@/features/admin/components/manage-user/pages/Accounting/Accounting";
import { Investors } from "@/features/admin/components/manage-user/pages/Investors/Investors";

export const ManageUserRoutes = [
	{
		path: "/manage-users/accounting",
		page: Accounting,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Manage Users",
	},
	{
		path: "/manage-users/investors",
		page: Investors,
		routeComponent: null,
		layout: DashboardLayout,
		name: "Manage Users",
	},
];
