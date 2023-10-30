import { DashboardLayout } from "@/components/layout/Dashboard";
import { CL } from "@/features/admin/components/investor-portals/pages/CL/CL.tsx";
import { FirstCapital } from "@/features/admin/components/investor-portals/pages/FirstCapital/FirstCapital.tsx";
import { FL } from "@/features/admin/components/investor-portals/pages/FL/FL.tsx";
import { IV } from "@/features/admin/components/investor-portals/pages/IV/IV.tsx";

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
