import type { FC } from "react";
import { CreatePassword } from "@/features/auth/components/CreatePassWord/CreatePassWord";
import { getLocalStorage } from "@/utils/local-storage";
import { mfaCode, userEmail } from "../../utils/constants";
import { AuthRoutesNames } from "../../routes/AuthRouter";

export const ResetCreatePassWord: FC = () => {
	const localEmail = getLocalStorage(userEmail);
	const localMfa = getLocalStorage(mfaCode);

	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full">
			<CreatePassword
				title="Reset Password"
				buttonText="Continue"
				receptor={localEmail}
				mfaCode={localMfa}
				navigateTo={AuthRoutesNames.SuccessResetPassword}
				backTo="reset-password-mfa"
			/>
		</div>
	);
};
