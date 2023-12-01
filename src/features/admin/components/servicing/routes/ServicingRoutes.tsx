import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CL } from "@/features/admin/components/servicing/pages/CL/CL";
import { FL } from "@/features/admin/components/servicing/pages/FL/FL";
import { IV } from "@/features/admin/components/servicing/pages/IV/IV";
import { V } from "@/features/admin/components/servicing/pages/V/V";

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
		path: "/servicing/dkc-v",
		page: V,
		layout: DashboardLayout,
	},
];
