import type { FC } from "react";
import { Success } from "@/features/auth/components/Success";

export const SuccessFirstLogin: FC = () => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full">
			<Success
				title="Success!"
				subTitle="Your account has been created, you may proceed to the login page."
				buttonText="Login"
				navigateTo="/login"
			/>
		</div>
	);
};
