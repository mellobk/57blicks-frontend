import { CreatePassWord } from "@/features/auth/pages/CreatePassword/CreatePassword.tsx";
import { FirstLogin } from "../pages/FirstLogin";
import { Login } from "../pages/Login";
import { LoginLayout } from "@/components/layout/Login";
import { ResetCreatePassWord } from "../pages/ResetCreatePassword";
import { ResetPassword } from "../pages/ResetPassword";
import { ResetPasswordMfa } from "../pages/ResetPasswordMfa";
import { SuccessFirstLogin } from "../pages/SuccessFirstLogin";
import { SuccessResetPassword } from "../pages/SuccessResetPassword";
import UnauthenticatedRoute from "@/routes/routes.tsx";

export const AuthRoutesNames = {
	firstLogin: "first-login",
	login: "/login",
	resetPassword: "reset-password",
	resetPasswordMfa: "reset-password-mfa",
	ResetCreatePassWord: "reset-create-password",
	SuccessResetPassword: "success-reset-password",
	LoginMfa: "login-mfa",
};

const AuthRoutes = [
	{
		path: `/${AuthRoutesNames.firstLogin}`,
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
		path: `${AuthRoutesNames.login}`,
		page: Login,
		layout: LoginLayout,
	},
	{
		path: `/${AuthRoutesNames.resetPassword}`,
		page: ResetPassword,
		layout: LoginLayout,
	},
	{
		path: `/${AuthRoutesNames.resetPasswordMfa}`,
		page: ResetPasswordMfa,
		layout: LoginLayout,
	},
	{
		path: `/${AuthRoutesNames.ResetCreatePassWord}`,
		page: ResetCreatePassWord,
		layout: LoginLayout,
	},
	{
		path: `/${AuthRoutesNames.SuccessResetPassword}`,
		page: SuccessResetPassword,
		layout: LoginLayout,
	},
];

const AuthRouter = UnauthenticatedRoute(AuthRoutes);

export default AuthRouter;
