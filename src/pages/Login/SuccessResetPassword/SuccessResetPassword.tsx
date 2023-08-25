import type { FC } from "react";
import { Success } from "@/features/Login/components/Success";

export const SuccessResetPassword: FC = () => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full">
			<Success
				iconName="shield"
				title="Success!"
				subTitle="Your password has been reset, you may proceed to the login page."
				buttonText="Login"
			/>
		</div>
	);
};
