
import UnauthenticatedRoute from "./routes";
import Home from "@/pages/Home";

const indexRoutes = [
	{
		path: "/Home",
		page: Home,
		routeComponent: null,
		layout: null,

	},

];

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const IndexRouter = UnauthenticatedRoute(indexRoutes,)

export default IndexRouter;
