import { DashboardInformation } from "../../component/DashboardInformation/DashboardInformation";
import { FC } from "react";

export const Profile: FC = () => {
	return (
		<div className="h-full w-full rounded-3xl bg-white flex gap-5 p-5">
			<DashboardInformation />
		</div>
	);
};
