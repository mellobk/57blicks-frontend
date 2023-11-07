import type { User } from "@/features/admin/components/manage-user/types/api";
import { type FC, useEffect, useState } from "react";
import { PasswordInformation } from "../PasswordInformation/PasswordInformation";
import { GeneralInformation } from "../GeneralInformation/GeneralInformation";
import userStore from "@/stores/user-store.ts";

export const DashboardInformation: FC = () => {
	const userInfo = userStore((state) => state.loggedUserInfo);
	const [userData, setUserData] = useState<User>({});

	useEffect(() => {
		setUserData(userInfo);
	}, [userInfo]);

	const getLabel = (name: string): string => {
		if (!name) return "";

		const initials = name
			.split(" ")
			.map((part) => part.charAt(0).toUpperCase())
			.join("");
		return initials.length > 2 ? initials.slice(0, 2) : initials;
	};
	return (
		<div className="h-full w-full rounded-3xl flex flex-col items-center relative">
			<div className="h-[150px] w-full rounded-[16px] bg-gray-200 absolute"></div>
			<div className="z-10 mt-[90px] flex items-center flex-col gap-2  w-full">
				<div className="w-[128px] h-[128px] flex items-center justify-center bg-blue-300 rounded-full ">
					<div className="text-white text-[36px]">
						{getLabel(`${userData.firstName} ${userData.lastName}`)}
					</div>
				</div>
				<div className="text-[28px]">{`${userData.firstName} ${userData.lastName}`}</div>

				<div className="text-[16px]  text-gray-250">{userData.email}</div>

				<div className="w-full flex gap-4 mt-4">
					<div className="w-[50%]">
						<GeneralInformation />
					</div>

					<div className="w-[50%]">
						<PasswordInformation />
					</div>
				</div>
			</div>
		</div>
	);
};
