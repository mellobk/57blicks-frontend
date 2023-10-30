import { mfaCode, userEmail } from "../../utils/constants.ts";

import { CreatePassword } from "@/features/auth/components/CreatePassWord/CreatePassWord.tsx";
import type { FC } from "react";
import { getLocalStorage } from "@/utils/local-storage.ts";

export const CreatePassWord: FC = () => {
	const localEmail = getLocalStorage(userEmail);
	const localMfa = getLocalStorage(mfaCode);
	return (
		<div className="flex flex-col items-center  gap-3 h-full">
			<CreatePassword
				title="Welcome to DKC!"
				subTitle="Thanks for confirming it’s you, you can create your password now."
				buttonText="Continue"
				backTo="/first-login"
				receptor={localEmail}
				mfaCode={localMfa}
				navigateTo="success-first-login"
			/>
		</div>
	);
};
