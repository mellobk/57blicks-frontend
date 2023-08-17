import { LoginLayout } from "../components/layout/Login/Login";
import Home from "../pages/Home";
import UnauthenticatedRoute from "./routes";

const indexRoutes = [
	{
		path: "/",
		page: Home,
		routeComponent: null,
		layout: LoginLayout

	},
	{
		path: "/Login",
		page: Home,
		routeComponent: null,
		layout: null

	},
];

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const IndexRouter = UnauthenticatedRoute(indexRoutes)

export default IndexRouter;
