import { CreatePassWord } from "@/features/auth/pages/CreatePassword/CreatePassword";
import { Login } from "../pages/Login";
import { LoginLayout } from "@/components/layout/Login";
import UnauthenticatedRoute from "@/routes/routes";
import { Home } from "../pages/Home/Home";

export const AuthRoutesNames = {
	firstLogin: "first-login",
	login: "/login",
	register: "register",
	resetPasswordMfa: "reset-password-mfa",
	ResetCreatePassWord: "reset-create-password",
	SuccessResetPassword: "success-reset-password",
	LoginMfa: "login-mfa",
};

const AuthRoutes = [
	{
		path: `/`,
		page: Home,
		layout: LoginLayout,
	},
	{
		path: `${AuthRoutesNames.register}`,
		page: CreatePassWord,
		layout: LoginLayout,
	},

	{
		path: `${AuthRoutesNames.login}`,
		page: Login,
		layout: LoginLayout,
	},
];

const AuthRouter = UnauthenticatedRoute(AuthRoutes);

export default AuthRouter;
