import { DashboardLayout } from "@/components/layout/Dashboard";
import { CL } from "@/features/admin/components/investor-portals/pages/CL/CL";
import { FirstCapital } from "@/features/admin/components/investor-portals/pages/FirstCapital/FirstCapital";
import { FL } from "@/features/admin/components/investor-portals/pages/FL/FL";
import { IV } from "@/features/admin/components/investor-portals/pages/IV/IV";

export const InvestorPortalsRoutes = [
	{
		path: "/investor-portals/dkc-fl",
		page: FL,
		layout: DashboardLayout,
	},
	{
		path: "/investor-portals/dkc-cl",
		page: CL,
		layout: DashboardLayout,
	},
	{
		path: "/investor-portals/dkc-iv",
		page: IV,
		layout: DashboardLayout,
	},
	{
		path: "/investor-portals/first-capital",
		page: FirstCapital,
		layout: DashboardLayout,
	},
];
