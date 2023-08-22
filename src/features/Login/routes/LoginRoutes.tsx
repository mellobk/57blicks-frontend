import { LoginLayout } from "@/components/layout/Login";
import { CreatePassWord } from "@/pages/Login/CreatePassword/CreatePassword";
import { FirtsLogin } from "@/pages/Login/FirtsLogin";
import { Login } from "@/pages/Login/Login";
import { LoginMfa } from "@/pages/Login/LoginMfa";
import { ResetCreatePassWord } from "@/pages/Login/ResetCreatePassword";
import { ResetPassword } from "@/pages/Login/ResetPassword";
import { ResetPasswordMfa } from "@/pages/Login/ResetPasswordMfa";
import { SuccessFirstLogin } from "@/pages/Login/SuccessFirstLogin";
import { SuccessResetPassword } from "@/pages/Login/SuccessResetPassword";
import UnauthenticatedRoute from "@/routes/routes";

const LoginRoutes = [
	{
		path: "/",
		page: FirtsLogin,
		routeComponent: null,
		layout: LoginLayout,
	},

	{
		path: "/create-password",
		page: CreatePassWord,
		routeComponent: null,
		layout: LoginLayout,
	},
	{
		path: "/success-first-login",
		page: SuccessFirstLogin,
		routeComponent: null,
		layout: LoginLayout,
	},
	{
		path: "/login",
		page: Login,
		routeComponent: null,
		layout: LoginLayout,
	},

	{
		path: "/login-mfa",
		page: LoginMfa,
		routeComponent: null,
		layout: LoginLayout,
	},

	{
		path: "/reset-password",
		page: ResetPassword,
		routeComponent: null,
		layout: LoginLayout,
	},

	{
		path: "/reset-password-mfa",
		page: ResetPasswordMfa,
		routeComponent: null,
		layout: LoginLayout,
	},

	{
		path: "/reset-create-password",
		page: ResetCreatePassWord,
		routeComponent: null,
		layout: LoginLayout,
	},

	{
		path: "/success-reset-password",
		page: SuccessResetPassword,
		routeComponent: null,
		layout: LoginLayout,
	},
];

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const LoginRouter = UnauthenticatedRoute(LoginRoutes);

export default LoginRouter;
