import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { useAuth } from "@/providers/AuthContextProvider";
import { useNavigate } from "@tanstack/router";

interface LogOffProps {
	userName: string;
	firstName: string;
}

export const LogOff: React.FC<LogOffProps> = ({ userName, firstName }) => {
	const navigate = useNavigate();
	const { signOut } = useAuth();
	const LogOutUser = (): void => {
		signOut();
		localStorage.clear();
		void navigate({ to: `/login` });
	};
	return (
		<div
			className="h-[45px] w-full rounded-[20px] bg-white flex justify-between items-center p-3 cursor-pointer"
			onClick={LogOutUser}
		>
			<div>
				<Avatar name={userName} /> {firstName}{" "}
			</div>
			<div>
				<Icon name="doorOut" width="20" color="black" />
			</div>
		</div>
	);
};
