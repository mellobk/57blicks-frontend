import type { FC } from "react";
import { CreatePassword } from "@/features/Login/components/CreatePassWord/CreatePassWord";

export const ResetCreatePassWord: FC = () => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full">
			<CreatePassword title="Reset Password" buttonText="Continue" />
		</div>
	);
};
