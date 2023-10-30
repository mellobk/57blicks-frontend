import { DashboardLayout } from "@/components/layout/Dashboard";
import { CL } from "@/features/admin/components/servicing/pages/CL/CL.tsx";
import { FirstCapital } from "@/features/admin/components/servicing/pages/FirstCapital/FirstCapital.tsx";
import { FL } from "@/features/admin/components/servicing/pages/FL/FL.tsx";
import { IV } from "@/features/admin/components/servicing/pages/IV/IV.tsx";

export const ServicingRoutes = [
	{
		path: "/servicing/dkc-fl",
		page: FL,
		layout: DashboardLayout,
	},
	{
		path: "/servicing/dkc-cl",
		page: CL,
		layout: DashboardLayout,
	},
	{
		path: "/servicing/dkc-iv",
		page: IV,
		layout: DashboardLayout,
	},
	{
		path: "/servicing/first-capital",
		page: FirstCapital,
		layout: DashboardLayout,
	},
];
