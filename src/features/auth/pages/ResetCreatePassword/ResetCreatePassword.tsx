import type { FC } from "react";
import { CreatePassword } from "@/features/auth/components/CreatePassWord/CreatePassWord.tsx";
import { getLocalStorage } from "@/utils/local-storage.ts";
import { mfaCode, userEmail } from "../../utils/constants.ts";
import { AuthRoutesNames } from "../../routes/AuthRouter.tsx";

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
