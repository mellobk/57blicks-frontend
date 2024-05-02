import UnauthenticatedRoute from "@/routes/routes";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Home } from "../pages/Home/Home";
import { Favorites } from "../pages/favorites/Favorites";

export const HomeRoutesNames = {
	movies: "/movies",
	favorites: "/favorites",
};

const AuthRoutes = [
	{
		path: HomeRoutesNames.movies,
		page: Home,
		layout: DashboardLayout,
	},
	{
		path: HomeRoutesNames.favorites,
		page: Favorites,
		layout: DashboardLayout,
	},
];

const HomeRouter = UnauthenticatedRoute(AuthRoutes);

export default HomeRouter;
