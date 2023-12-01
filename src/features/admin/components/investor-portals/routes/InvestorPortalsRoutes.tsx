import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CL } from "@/features/admin/components/investor-portals/pages/CL/CL";
import { FL } from "@/features/admin/components/investor-portals/pages/FL/FL";
import { IV } from "@/features/admin/components/investor-portals/pages/IV/IV";
import { V } from "@/features/admin/components/investor-portals/pages/V/V";

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
		path: "/investor-portals/dkc-v",
		page: V,
		layout: DashboardLayout,
	},
];
