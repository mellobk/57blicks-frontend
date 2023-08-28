import type { FC } from "react";
import { LoginForm } from "@/features/auth/components/Login";

export const Login: FC = () => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full">
			<LoginForm />
		</div>
	);
};
