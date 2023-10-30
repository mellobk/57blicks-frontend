import { Icon } from "@/components/ui/Icon";
import { useAuth } from "@/providers/AuthContextProvider";
import { useNavigate } from "@tanstack/router";
import type { FC } from "react";

export const LogOff: FC = () => {
	const navigate = useNavigate();
	const { signOut } = useAuth();
	const LogOutUser = (): void => {
		signOut();
		localStorage.clear();
		void navigate({ to: `/login` });
	};
	return (
		<div
			className="h-[45px] w-full rounded-[20px] bg-white flex justify-between items-center  cursor-pointer"
			onClick={LogOutUser}
		>
			<div className="flex gap-2 bg-gray-100 w-full p-2 rounded-[10px] text-red-300">
				<Icon name="doorOut" width="20" color="red" /> Logout
			</div>
		</div>
	);
};
