import UnauthenticatedRoute from "./routes";
import { Home } from "@/features/auth/pages/Home/Home";

const AppRoutes = [
	{
		path: "/403",
		page: Home,
		layout: null,
	},
];

const AppRouter = UnauthenticatedRoute([...AppRoutes]);

export default AppRouter;
