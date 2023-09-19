import { DashboardInformation } from "../../component/DashboardInformation/DashboardInformation";
import { UserInformation } from "../../component/UserInformation/UserInformation";

export const Profile: React.FC = () => {
	return (
		<div className="h-full w-full rounded-3xl bg-white flex gap-5 p-5">
			<div className="w-[15%]">
				<UserInformation />
			</div>
			<div className="w-[85%]">
				<DashboardInformation />
			</div>
		</div>
	);
};
