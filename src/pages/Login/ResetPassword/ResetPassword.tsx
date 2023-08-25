import type { FC } from "react";
import { ResetPasswordForm } from "@/features/Login/components/ResetPassword";

export const ResetPassword: FC = () => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full">
			<ResetPasswordForm />
		</div>
	);
};
