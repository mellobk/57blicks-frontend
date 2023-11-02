import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CL } from "@/features/admin/components/servicing/pages/CL/CL";
import { FirstCapital } from "@/features/admin/components/servicing/pages/FirstCapital/FirstCapital";
import { FL } from "@/features/admin/components/servicing/pages/FL/FL";
import { IV } from "@/features/admin/components/servicing/pages/IV/IV";

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
