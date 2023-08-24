import UnauthenticatedRoute from "./routes";
import Home from "@/pages/Home";

const indexRoutes = [
	{
		path: "/Home",
		page: Home,
		layout: null,
	},
];

const IndexRouter = UnauthenticatedRoute(indexRoutes);

export default IndexRouter;
