/* eslint-disable @typescript-eslint/no-misused-promises */

import { Mfa } from "@/features/Login/components/Mfa";

export const LoginMfa: React.FC = () => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full">
			<Mfa
				title="Confirm MFA"
				subTitle="We’ve sent a 6 digit code to your registered phone number."
				buttonText="Login"
			/>
		</div>
	);
};
