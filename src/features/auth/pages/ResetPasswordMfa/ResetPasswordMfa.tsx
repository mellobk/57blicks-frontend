import type { FC } from "react";
import { Mfa } from "@/features/auth/components/Mfa";
import { getLocalStorage } from "@/utils/local-storage";
import { userEmail } from "../../utils/constants";
import { loginRoutesNames } from "../../routes/LoginRouter";

export const ResetPasswordMfa: FC = () => {
	const localEmail = getLocalStorage(userEmail);
	const emailParts = localEmail.split("@");
	const hiddenEmail = `${emailParts[0]?.replace(
		emailParts[0]?.slice(0, Math.max(0, emailParts[0].length - 4)),
		"*******"
	)}@${emailParts[1]}`;

	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full">
			<Mfa
				title="Reset Password"
				buttonText="Continue"
				receptorCode={localEmail}
				labelData={hiddenEmail}
				navigateTo={loginRoutesNames.ResetCreatePassWord}
				backRoute={loginRoutesNames.resetPassword}
			/>
		</div>
	);
};
