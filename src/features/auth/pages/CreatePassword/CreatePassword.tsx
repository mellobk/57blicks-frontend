import { Register } from "@/features/auth/components/CreatePassWord/CreatePassWord";
import type { FC } from "react";

export const CreatePassWord: FC = () => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full">
			<Register
				title="Welcome "
				subTitle="Thanks for create you account."
				buttonText="Continue"
				backTo="/login"
				navigateTo="login"
			/>
		</div>
	);
};
