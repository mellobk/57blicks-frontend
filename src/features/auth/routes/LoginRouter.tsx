import { LoginLayout } from "@/components/layout/Login";
import { CreatePassWord } from "@/features/auth/pages/CreatePassword/CreatePassword";

import UnauthenticatedRoute from "@/routes/routes";
import { FirstLogin } from "../pages/FirstLogin";
import { SuccessFirstLogin } from "../pages/SuccessFirstLogin";
import { Login } from "../pages/Login";
import { LoginMfa } from "../pages/LoginMfa";
import { ResetPassword } from "../pages/ResetPassword";
import { ResetPasswordMfa } from "../pages/ResetPasswordMfa";
import { ResetCreatePassWord } from "../pages/ResetCreatePassword";
import { SuccessResetPassword } from "../pages/SuccessResetPassword";

const LoginRoutes = [
	{
		path: "/",
		page: FirstLogin,
		layout: LoginLayout,
	},
	{
		path: "/create-password",
		page: CreatePassWord,
		layout: LoginLayout,
	},
	{
		path: "/success-first-login",
		page: SuccessFirstLogin,
		layout: LoginLayout,
	},
	{
		path: "/login",
		page: Login,
		layout: LoginLayout,
	},
	{
		path: "/login-mfa",
		page: LoginMfa,
		layout: LoginLayout,
	},
	{
		path: "/reset-password",
		page: ResetPassword,
		layout: LoginLayout,
	},
	{
		path: "/reset-password-mfa",
		page: ResetPasswordMfa,
		layout: LoginLayout,
	},
	{
		path: "/reset-create-password",
		page: ResetCreatePassWord,
		layout: LoginLayout,
	},
	{
		path: "/success-reset-password",
		page: SuccessResetPassword,
		layout: LoginLayout,
	},
];

const LoginRouter = UnauthenticatedRoute(LoginRoutes);

export default LoginRouter;
