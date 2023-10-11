import { type FC, useState } from "react";
import { LoginForm } from "@/features/auth/components/Login";
import { LoginMfaComponent } from "../../components/LoginMfa";

type LoginData = {
	email: string;
	password: string;
};

export const Login: FC = () => {
	const [loginMfa, setLoginMfa] = useState<boolean>(true);
	const [loginData, setLoginData] = useState<LoginData>();

	const successFirstLogin = (data: LoginData): void => {
		setLoginData(data);
		setLoginMfa(false);
	};

	const localEmail = loginData?.email || "";
	const emailParts = localEmail?.split("@");
	const hiddenEmail = `${emailParts[0]?.replace(
		emailParts[0]?.slice(0, Math.max(0, emailParts[0].length - 4)),
		"*******"
	)}@${emailParts[1]}`;

	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full">
			{loginMfa ? (
				<LoginForm handleSuccessLogin={successFirstLogin} />
			) : (
				<LoginMfaComponent
					data={loginData}
					title="Confirm MFA"
					subTitle="We’ve sent a 6 digit code to your registered phone number."
					buttonText="Login"
					receptorCode={localEmail}
					labelData={hiddenEmail}
					navigateTo={"manage-users/admins"}
					backRoute={(): void => {
						setLoginMfa(true);
					}}
				/>
			)}
		</div>
	);
};
