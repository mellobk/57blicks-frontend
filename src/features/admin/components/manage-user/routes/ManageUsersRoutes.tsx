import { DashboardLayout } from "@/components/layout/Dashboard";
import { Accounting } from "@/features/admin/components/manage-user/pages/Accounting/Accounting.tsx";
import { Investors } from "@/features/admin/components/manage-user/pages/Investors/Investors.tsx";

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
