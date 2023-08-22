/* eslint-disable @typescript-eslint/no-misused-promises */

import { Success } from "@/features/Login/components/Success";

export const SuccessFirstLogin: React.FC = () => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full">
			<Success
				title="Success!"
				subTitle="Your account has been created, you may proceed to the login page."
				buttonText="Login"
			/>
		</div>
	);
};
