import { LoginLayout } from "@/components/layout/Login";
import { CreatePassWord } from "@/features/auth/pages/CreatePassword/CreatePassword";

import UnauthenticatedRoute from "@/routes/routes";
import { FirstLogin } from "../pages/FirstLogin";
import { SuccessFirstLogin } from "../pages/SuccessFirstLogin";
import { Login } from "../pages/Login";
import { ResetPassword } from "../pages/ResetPassword";
import { ResetPasswordMfa } from "../pages/ResetPasswordMfa";
import { ResetCreatePassWord } from "../pages/ResetCreatePassword";
import { SuccessResetPassword } from "../pages/SuccessResetPassword";

export const loginRoutesNames = {
	firstLogin: "first-login",
	login: "/login",
	resetPassword: "reset-password",
	resetPasswordMfa: "reset-password-mfa",
	ResetCreatePassWord: "reset-create-password",
	SuccessResetPassword: "success-reset-password",
	LoginMfa: "login-mfa",
};

const LoginRoutes = [
	{
		path: `/${loginRoutesNames.firstLogin}`,
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
		path: `${loginRoutesNames.login}`,
		page: Login,
		layout: LoginLayout,
	},
	{
		path: `/${loginRoutesNames.resetPassword}`,
		page: ResetPassword,
		layout: LoginLayout,
	},
	{
		path: `/${loginRoutesNames.resetPasswordMfa}`,
		page: ResetPasswordMfa,
		layout: LoginLayout,
	},
	{
		path: `/${loginRoutesNames.ResetCreatePassWord}`,
		page: ResetCreatePassWord,
		layout: LoginLayout,
	},
	{
		path: `/${loginRoutesNames.SuccessResetPassword}`,
		page: SuccessResetPassword,
		layout: LoginLayout,
	},
];

const LoginRouter = UnauthenticatedRoute(LoginRoutes);

export default LoginRouter;
