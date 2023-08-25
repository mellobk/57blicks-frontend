import type { FC } from "react";
import { CreatePassword } from "@/features/Login/components/CreatePassWord/CreatePassWord";

export const CreatePassWord: FC = () => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full">
			<CreatePassword
				title="Welcome to DKC!"
				subTitle="Thanks for confirming it’s you, you can create your password now."
				buttonText="Continue"
			/>
		</div>
	);
};
