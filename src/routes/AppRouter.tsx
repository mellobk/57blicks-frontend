import { ForbiddenPage } from "@/features/auth/pages/forbidden/ForbiddenPage";
import UnauthenticatedRoute from "./routes";

const AppRoutes = [
	{
		path: "/403",
		page: ForbiddenPage,
		layout: null,
	},
];

const AppRouter = UnauthenticatedRoute([...AppRoutes]);

export default AppRouter;
