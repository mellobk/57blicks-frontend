import { LoginLayout } from "@/components/layout/Login";
import { FirtsLogin } from "@/pages/Login/FirtsLogin";


import UnauthenticatedRoute from "@/routes/routes";
;

const LoginRoutes = [
	{
		path: "/first-login",
		page: FirtsLogin,
		routeComponent: null,
		layout: LoginLayout,

	},

];

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const LoginRouter = UnauthenticatedRoute(LoginRoutes,)

export default LoginRouter;
